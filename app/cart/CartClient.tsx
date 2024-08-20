"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import React, { FC } from "react";
import { MdArrowBack } from "react-icons/md";
import Heading from "../product/[productId]/heading/Heading";
import Button from "../product/[productId]/button/Button";
import ItemContent from "./itemContent/ItemContent";
import { formatPrice } from "../utils/formatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface ICartClient {
  currentUser: SafeUser | null
}

const CartClient:FC<ICartClient> = ({currentUser}) => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();

  const router = useRouter()

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is empty</div>
        <div>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="hidden md:grid grid-cols-5 gap-4 pb-2 text-xs items-center mt-8">
        <h2 className="col-span-2 justify-self-start">PRODUCT</h2>
        <h2 className="justify-self-center">PRICE</h2>
        <h2 className="justify-self-center">QUANTITY</h2>
        <h2 className="justify-self-end">TOTAL</h2>
      </div>
      <ul>
        {cartProducts &&
          cartProducts.map((item) => <ItemContent key={item.id} item={item}/>)}
      </ul>
      <div className="flex flex-col md:flex-row justify-between gap-4 py-4 border-t-[1.5px] border-slate-200">
  <div className="w-full md:max-w-[90px]">
    <Button 
      label="Clear Cart" 
      small 
      outline 
      onClick={() => handleClearCart()} 
    />
  </div>
  <div className="w-full md:w-auto">
    <div className="flex justify-between w-full font-semibold text-base mb-4 md:mb-0">
      <span>Subtotal</span>
      <span>{formatPrice(cartTotalAmount)}</span>
    </div>
    <p className="text-slate-500 mb-4 md:mb-0">
      Taxes and shipping calculate at checkout
    </p>
    <Button 
      outline={currentUser ? false : true} 
      label={currentUser ? "Checkout" : "Login To Checkout"} 
      onClick={() => {currentUser ? router.push('checkout') : router.push('/login')}}
    />
    <Link 
      href={"/"} 
      className="flex items-center justify-center md:justify-start gap-2 text-slate-500"
    >
      <MdArrowBack/>
      <p>Continue Shopping</p>
    </Link>
  </div>
</div>
    </div>
  );
};

export default CartClient;
