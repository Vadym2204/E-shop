"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import styles from "./ProductDetail.module.scss";
import { Rating } from "@mui/material";
import { Horizontal } from "@/app/components/styles/Horizontal";
import SetColor from "@/app/product/[productId]/setColor/SetColor";
import {
  ICartProduct,
  IProductDetailProps,
  ISelectedImg,
} from "./ProductDetail.data";
import SetQuantity from "../setQuantity/SetQuantity";
import Button from "../button/Button";
import ProductImage from "../productImage/ProductImage";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

export const ProductDetail: FC<IProductDetailProps> = ({ product }) => {
  const {cartProducts, handleAddProductToCart} = useCart()
  const [isProductInCart, setIsProductInCart] = useState(true)
  const [cartProduct, setCartProduct] = useState<ICartProduct>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg:{ ...product.images[0] },
    quantity: 1,
    price: product.price,
  });
  
  const router = useRouter()

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  useEffect(() => {
    setIsProductInCart(false)
    
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(item => item.id === product.id)
  
      if(existingIndex > -1) {
        setIsProductInCart(true)
      }
    }
  }, [cartProducts])

  const handleColorSelect = useCallback(
    (value: ISelectedImg) => {
      setCartProduct((prev) => ({ ...prev, selectedImg: value }));
    },
    [cartProduct.selectedImg]
  );

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);

  return (
    <div className={styles.detail}>
      <ProductImage product={product} handleColorSelect={handleColorSelect} cartProduct={cartProduct}/>
      <div className={styles.content}>
        <h2 className={styles.title}>{product.name}</h2>
        <div className={styles.info}>
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <p className={styles.description}>{product.description}</p>
        <Horizontal />
        <span className={styles.category}>Category: {product.category}</span>
        <span className={styles.brand}>Brand: {product.brand}</span>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <Horizontal />
        {isProductInCart ?
        <>
        <p className="text-slate-500 mb-2 flex items-center gap-1">
          <MdCheckCircle className="text-teal-400" size={20}/>
          <span>Product added to cart</span>
        </p>
        <div className={styles.button}>
        <Button label="View Cart" outline onClick={() => {router.push("/cart")}}/>
        </div>
        </> : <>
        <SetColor
          images={product.images}
          cartProduct={cartProduct}
          handleColorSelect={handleColorSelect}
        />
        <SetQuantity
          cartProduct={cartProduct}
          handleQtyIncrease={handleQtyIncrease}
          handleQtyDecrease={handleQtyDecrease}
        />
        <div className={styles.button}>
          <Button label="Add To Cart" onClick={() => handleAddProductToCart(cartProduct)}/>
        </div>
        </>}
      </div>
    </div>
  );
};

