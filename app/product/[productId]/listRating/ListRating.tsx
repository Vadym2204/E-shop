"use client";

import styles from "./ListRating.module.scss";
import { FC } from "react";
import Heading from "../heading/Heading";
import { IListRatingProps } from "./ListRating.data";
import moment from "moment";
import { Rating } from "@mui/material";
import Avatar from "./Avatar";

const ListRating: FC<IListRatingProps> = ({ product }) => {
  if (product.reviews.length ===  0) return null
  return (
    <div>
      <Heading title="Product Review" />
      <ul className={styles.list}>
        {product.reviews.map((review: any) => (
          <li className={styles.item} key={review.id}>
            <div className={styles.content}>
              <Avatar src={review?.user.image}/>
              <div className={styles.name}>{review?.user.name}</div>
              <div className={styles.date}>
                {moment(review.createDate).fromNow()}
              </div>
            </div>
            <div className={styles.rating}>
              <Rating value={review.rating} readOnly />
            </div>
            <div>{review.comment}</div>
            <hr className="mt-4 mb-4" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListRating;
