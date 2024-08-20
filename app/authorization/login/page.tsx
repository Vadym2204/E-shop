import Container from '@/app/components/styles/Container'
import React from 'react'
import FormWrap from '../FormWrap'
import LoginForm from './LoginForm'
import { getCurrentUser } from '@/actions/getCurrentUser'

const page = async () => {
  const currentUser = await getCurrentUser()
  return (
    <Container>
        <FormWrap>
            <LoginForm currentUser={currentUser}/>
        </FormWrap>
    </Container>        
  )
}

export default page