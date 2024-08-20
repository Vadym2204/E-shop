import { getCurrentUser } from '@/actions/getCurrentUser'
import getProducts from '@/actions/getProducts'
import NullData from '@/app/components/NullData'
import Container from '@/app/components/styles/Container'
import React from 'react'
import ManageProductsClient from './ManageProductsClient'

const ManageProduct = async () => {

  const products = await getProducts({category: null})
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title='Oops! Access denied'/>
  } 

  return (
    <div className='pt-8'>
      <Container>
          <ManageProductsClient products = {products} />
      </Container>
    </div>
  )
}

export default ManageProduct