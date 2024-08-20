import React, { FC } from 'react'
import styles from './ProductImage.module.scss'
import {ISelectedImg} from "@/app/product/[productId]/productDetail/ProductDetail.data"
import Image from 'next/image';
import Container from '@/app/components/styles/Container';
import { IProductImageProps } from './ProductImage.data';

const ProductImage:FC<IProductImageProps> = ({
    cartProduct,
    product,
    handleColorSelect
}) => {
  return (
    <Container>
    <div className={styles.content}>
        <ul className={styles.list}>
            {product.images.map((image: ISelectedImg,) => (
                <li key={image.color} onClick={() => handleColorSelect(image)} className={`${styles.item} ${cartProduct.selectedImg.color === image.color ? "border-[1.5px]" : "border-none"}`}>
                    <Image className={styles.smallImage} src={image.image} fill alt={image.color}/>
                </li>
            ))}
        </ul>
        <div className={styles.mainImg}>
            <Image fill key={cartProduct.name} src={cartProduct.selectedImg.image} alt={cartProduct.name} className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"/>
        </div>
    </div>
    </Container>
  )
}

export default ProductImage