import Container from "@/app/components/styles/Container";
import OrderDetail from "./OrderDetail";
import getOrderById from "@/actions/getOrdersById";
import NullData from "@/app/components/NullData";

interface IParams {
  orderId?: string;
}

const Order = async ({ params }: { params: IParams }) => {
  const order = await getOrderById(params);
  if (!order) return <NullData title="No order" />;
  
  return (
    <div className="p-8">
      <Container>
        <OrderDetail order={order} />
      </Container>
    </div>
  );
};

export default Order;
