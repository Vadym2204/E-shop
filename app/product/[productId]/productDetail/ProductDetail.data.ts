export interface IProductDetailProps {
    product: any;
  }
  
  export interface ICartProduct {
    id: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    selectedImg: ISelectedImg;
    quantity: number;
    price: number;
  }
  
  export interface ISelectedImg {
    color: string;
    colorCode: string;
    image: string;
  }