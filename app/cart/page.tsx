import { getCurrentUser } from "@/actions/getCurrentUser"
import Container from "../components/styles/Container"
import CartClient from "./CartClient"

const Cart = async () => {
  const currentUser = await getCurrentUser()
  return (
    <div>
      <Container>
        <CartClient currentUser={currentUser}/>
      </Container>
    </div>
  )
}

export default Cart