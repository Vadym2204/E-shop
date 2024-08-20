import { getCurrentUser } from "@/actions/getCurrentUser";
import { ICartProduct } from "@/app/product/[productId]/productDetail/ProductDetail.data";
import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb'
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

const calculateOrderAmount = (items: ICartProduct[]) => {
    const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);

  const price: any = Math.floor(totalPrice)

  return totalPrice
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;
  const total = calculateOrderAmount(items) * 100;
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };

  if (payment_intent_id) {
    const currency_intent = await stripe.paymentIntents.retrieve(
        payment_intent_id
    )

  if (currency_intent) {
    const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        {amount: total}
    )
    const [existing_order, update_order] = await Promise.all([
      prisma.order.findFirst({
          where: {paymentIntentId: payment_intent_id} 
      }),
      prisma.order.update({
          where: {paymentIntentId: payment_intent_id},
          data: {
              amount: total,
              products: items
      }
      })
    ])
  
    if (!existing_order){
      return NextResponse.json(
          {error: "Invalid Payment Intent"},
          {status: 400}
      )
    }
    return NextResponse.json({paymentIntent: updated_intent})
  }

  } else {
    // create the intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        automatic_payment_methods: {enabled: true},
    })
    //create the order
    orderData.paymentIntentId = paymentIntent.id

    await prisma.order.create({
        data: orderData
    })

    return NextResponse.json({paymentIntent})
  }

  return NextResponse.error()
}
