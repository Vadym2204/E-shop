import Container from "@/app/components/styles/Container";
import NullData from "@/app/components/NullData";
import OrdersClient from "./OrdersClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getOrders from "@/actions/getOrders";

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Oops! Access denied"/>
  }

  const orders = await getOrders();

  if (!orders) {
    return <NullData title="No orders yet..." />;
  }

  return (
    <div className="p-8">
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
