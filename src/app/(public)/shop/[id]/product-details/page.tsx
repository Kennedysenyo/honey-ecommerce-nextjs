import { ProductDetails } from "@/components/shop/ProductDetails";
import { products } from "@/lib/utils/dummy-data/products";
import { notFound } from "next/navigation";

export default async function ({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products.find((product) => product.id === id);
  if (!product) {
    notFound();
  }

  const similarProducts = products.filter((prod) => {
    const terms = product.name.toLowerCase().split(" ");

    return (
      terms.some((term) => prod.name.toLocaleLowerCase().includes(term)) &&
      prod.name.toLowerCase() !== product.name.toLowerCase()
    );
  });

  return <ProductDetails product={product} similarProducts={similarProducts} />;
}
