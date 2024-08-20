import { ICartProduct, ISelectedImg } from "../productDetail/ProductDetail.data";

export interface IProductImageProps {
    cartProduct: ICartProduct;
    product: any;
    handleColorSelect: (value: ISelectedImg) => void
}