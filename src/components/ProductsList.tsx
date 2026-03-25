import { Product } from "@/types/types";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
}

export const ProductsList = ({ products }: Props) => {
  const productELements = products.map(
    ({ id, name, description, price, size, image }) => (
      <ProductCard
        key={id}
        id={id}
        name={name}
        description={description}
        size={size}
        image={image}
        price={price}
      />
    ),
  );

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-12">
      {productELements}
    </ul>
  );
};
