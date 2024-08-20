import { getCurrentUser } from "@/actions/getCurrentUser"
import FormWrap from "@/app/authorization/FormWrap"
import Container from "@/app/components/styles/Container"
import AddProductForm from "./AddProductForm"
import NullData from "@/app/components/NullData"

const AddProduct = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.role !== "ADMIN") {
        return <NullData title="Oops! Access denied"/>
    }
  return (
    <div className="p-8">
        <Container>
            <FormWrap>
                <AddProductForm/>
            </FormWrap>
        </Container>
    </div>
  )
}

export default AddProduct