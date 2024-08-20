export const revalidate = 0;

import PageBanner from "./components/main/pageBanner/PageBanner";
import "./globals.scss";
import ProductCard from "./components/main/productCard/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

interface IHomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: IHomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return (
      <NullData title='Oops! No products found. Click "All" to clear filters' />
    );
  }

  function shuffleArray(array: any) {
    for (let i = 0; array.lenght - 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const shuffledProducts = shuffleArray(products);

  return (
    <div>
      <PageBanner />
      <div className="productList">
        {shuffledProducts.map((product: any) => {
          return <ProductCard data={product} key={product.id} />;
        })}
      </div>
    </div>
  );
}
