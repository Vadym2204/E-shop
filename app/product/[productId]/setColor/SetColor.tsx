"use client";

import styles from "./SetColor.module.scss";
import { FC } from "react";
import { ISetColorProps } from "./SetColor.data";

const SetColor: FC<ISetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div>
      <div className={styles.content}>
        <span className={styles.color}>COLOR: </span>
        <ul className={styles.list}>
          {images.map((image) => (
            <button
            key={image.color}
            onClick={() => handleColorSelect(image)}
            className={`${styles.item} ${
              cartProduct.selectedImg.color === image.color
                ? "border-[1px] border-teal-300"
                : "border border-gray-300"
            }`}
          >
            <span
              className="h-6 w-6 rounded-full"
              style={{ backgroundColor: image.color }}
            ></span>
          </button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SetColor;
