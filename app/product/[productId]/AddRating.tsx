'use client'

import { SafeUser } from "@/types"
import { Order, Product, Review } from "@prisma/client"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Heading from "./heading/Heading"
import { Rating } from "@mui/material"
import Button from "./button/Button"
import Input from "@/app/authorization/inputs/Input"
import toast from "react-hot-toast"
import axios from "axios"

interface IAddRatingProps {
    product: Product & {
        reviews: Review[]
    }
    user: (SafeUser & {
        orders: Order[]
    }) | null
}

const AddRating:FC<IAddRatingProps> = ({product, user}) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            comment: '',
            rating: 0
        }
    })

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true
        })
    }

    const onSubmit:SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        if (data.rating === 0) return
        setIsLoading(false) 
        toast.error('No rating selected')
        const ratingData = {...data, userId: user?.id, product: product}

        axios.post('/api/rating', ratingData).then(() => {
            toast.success('Rating submitted')
            router.refresh()
            reset()
        }).catch((error) => {
            toast.error('Something went wrong')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    if (!user || !product) return null
    
    const deliveryOrder = user?.orders.some(order => order.products.find(item => item.id === product.id) && order.deliveryStatus === 'delivered')

    const userReview = product?.reviews.find((review: Review) => {
        return review.userId === user.id
    })
    
    if (userReview || !deliveryOrder) return null

    return (
    <div className="flex flex-col gap-2 max-w-[500px]">
        <Heading title="Rate this product"/>
        <Rating onChange={(event, newValue) => {
            setCustomValue('rating', newValue)
        }}/>
        <Input
        id="comment"
        label='Comment'
        disabled ={isLoading}
        register={register}
        errors={errors}
        required
        />
        <Button label={isLoading ? "Loading" : 'Rate Product'} onClick={handleSubmit(onSubmit)}/>
    </div>
  )
}

export default AddRating