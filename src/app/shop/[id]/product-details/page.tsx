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
  return <ProductDetails product={product} />;
}
