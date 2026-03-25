import { products } from "@/lib/utils/dummy-data/products";
import { ButtonLink } from "../ButtonLink";
import { ProductsList } from "../ProductsList";

export const ProductsPreview = () => {
  return (
    <section className="max-w-7xl mx-auto section-p-one">
      <div className="px-4 sm:px-6 md:px-8 space-y-4 md:space-y-6">
        <h2 className="font-heading title-two text-center">
          Our Premium <span className="text-gold">Honey Collection</span>
        </h2>
        <p className="text-center subtitle-two">
          Discover our carefully curated selection of pure, natural honey
          products
        </p>

        <ProductsList products={products} />
        <ButtonLink
          href="/shop"
          label="View All Products"
          className="mx-auto"
        />
      </div>
    </section>
  );
};
