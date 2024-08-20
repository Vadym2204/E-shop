import SetQuantity from "@/app/product/[productId]/setQuantity/SetQuantity";
import { formatPrice } from "@/app/utils/formatPrice";
import { trancateText } from "@/app/utils/trancateText";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { IItemContentProps } from "./ItemContent.data";
import { useCart } from "@/hooks/useCart";
import styles from './ItemContent.module.scss'

const ItemContent: FC<IItemContentProps> = ({ item }) => {
  const { handleRemoveProductFromCart, handleQtyIncrease, handleQtyDecrease } = useCart()
  return (
    <div className={styles.itemContent}>
      <div className={styles.content}>
        <Link className={styles.item} href={`/product/${item.id}`}>
          <Image className={styles.img} src={item.selectedImg.image} alt={item.name} fill />
        </Link>
        <div className={styles.info}>
          <Link href={`/product/${item.id}`}>{trancateText(item.name)}</Link>
          <div>{item.selectedImg.color}</div>
          <div className="md:hidden">
            <div>Price: {formatPrice(item.price)}</div>
            <div>Quantity: {item.quantity}</div>
            <div>Total: {formatPrice(item.price * item.quantity)}</div>
          </div>
          <div className="w-[70px]">
            <button className={styles.button} onClick={() => handleRemoveProductFromCart(item)}>
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:block justify-self-center">{formatPrice(item.price)}</div>
      <div className="hidden md:block justify-self-center">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyIncrease={() => handleQtyIncrease(item)}
          handleQtyDecrease={() => handleQtyDecrease(item)}
        />
      </div>
      <div className="hidden md:block justify-self-end">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
