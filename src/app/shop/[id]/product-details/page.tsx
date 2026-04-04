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
    for (const term of product.name.split("")) {
      if (prod.name.includes(term)) return true;
    }
    return false;
  });

  // for (const prod of products) {
  //   for (const term of product.name.split("")) {
  //     if (prod.name.includes(term)) return prod;
  //   }
  // }
  return <ProductDetails product={product} similarProducts={similarProducts} />;
}
