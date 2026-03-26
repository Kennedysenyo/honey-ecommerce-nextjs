import { Banner } from "@/components/Banner";
import { ProductsList } from "@/components/ProductsList";
import { products } from "@/lib/utils/dummy-data/products";

export default function ShopPage() {
  return (
    <div className="">
      <Banner
        title="Shop Our Premium Honey "
        subtitle="Browse our complete collection of pure, natural honey products."
        image="/images/shop-banner2.jpg"
      />
      <section className="section-py-one bg-cream">
        <div className="section-max-w  section-px-one mx-auto">
          <ProductsList products={products} />
        </div>
      </section>
    </div>
  );
}
