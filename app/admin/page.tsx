import getOrders from "@/actions/getOrders"
import getProducts from "@/actions/getProducts"
import Container from "../components/styles/Container"
import Summary from "./Summary"
import getUsers from "@/actions/getUsers"

const Admin = async () => {
  const products = await getProducts({category: null})
  const orders = await getOrders()
  const users = await getUsers()

  return (
    <div>
      <Container>
        <Summary products={products} orders={orders} users={users}/>
      </Container>
    </div>
  )
}

export default Admin