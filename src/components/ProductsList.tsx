import { Product } from "@/types/types";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
}

export const ProductsList = ({ products }: Props) => {
  const productElements = products.map((product, i) => (
    <ProductCard key={product.id} product={product} index={i} />
  ));

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 ">
      {productElements}
    </ul>
  );
};
