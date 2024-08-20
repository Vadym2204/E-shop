"use client";
import { trancateText } from "@/app/utils/trancateText";
import Image from "next/image";
import React, { FC } from "react";
import styles from "./ProductCard.module.scss";
import { formatPrice } from "@/app/utils/formatPrice";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { ProductCardProps } from "./ProductCard.data";

const ProductCard: FC<ProductCardProps> = ({ data }: any) => {
  const router = useRouter();

  const productRating =
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length;

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className={styles.productCard}
    >
      <div className={styles.Content}>
        <div className={styles.Info}>
          <Image
            className={styles.Image}
            width={100}
            height={100}
            src={data.images[0].image}
            alt={data.name}
          />
        </div>
        <h2 className={styles.title}>{trancateText(data.name)}</h2>
        <Rating value={productRating} readOnly />
        <p>{data.reviews.length} reviews</p>
        <span className={styles.Price}>
          {formatPrice(data.price) as React.ReactNode}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
