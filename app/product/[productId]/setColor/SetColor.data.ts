import { ICartProduct, ISelectedImg } from "../productDetail/ProductDetail.data";

export interface ISetColorProps {
    images: ISelectedImg[];
    cartProduct: ICartProduct;
    handleColorSelect: (value: ISelectedImg) => void;
  }