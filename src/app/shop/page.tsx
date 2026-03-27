"use client";

import { Banner } from "@/components/Banner";
import { ProductsList } from "@/components/ProductsList";
import { SearchBar } from "@/components/shop/SearchBar";
import { useProducts } from "@/lib/hooks/use-products";

export default function ShopPage() {
  const productState = useProducts();

  return (
    <div className="">
      <Banner
        title="Shop Our Premium Honey "
        subtitle="Browse our complete collection of pure, natural honey products."
        image="/images/shop-banner2.jpg"
      />
      <section className="section-py-one relative bg-cream/40">
        <SearchBar />
        <div className="section-max-w mt-8 section-px-one mx-auto">
          <ProductsList products={productState.filteredProducts} />
        </div>
      </section>
    </div>
  );
}
