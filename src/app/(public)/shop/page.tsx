"use client";

import { Banner } from "@/components/Banner";
import { ProductsList } from "@/components/ProductsList";
import { Pagination } from "@/components/shop/Pagination";
import { SearchBar } from "@/components/shop/SearchBar";
import { useProducts } from "@/lib/hooks/use-products";
import { ITEMS_PER_PAGE } from "@/lib/reducers/products-reducer";

export default function ShopPage() {
  const { state, handleSearch, searchTerm, handlePagination } = useProducts();

  return (
    <>
      <Banner
        title="Shop Our Premium Honey "
        subtitle="Browse our complete collection of pure, natural honey products."
        image="/assets/images/shop-banner.jpg"
      />
      <section className="section-py-one relative bg-linear-to-br from-cream to-background">
        <SearchBar handler={handleSearch} value={searchTerm} />
        <div className="section-max-w mt-4 section-px-one mx-auto">
          {state.loading ? (
            <div className="loader mx-auto"></div>
          ) : state.error ? (
            <div className=" mx-auto max-w-md text-center py-8 bg-red-100 rounded-3xl border-2 border-amber">
              <p className="text-lg text-red-600">{state.error}</p>
            </div>
          ) : (
            <ProductsList products={state.paginatedProducts} />
          )}
          <Pagination
            numberOfPages={Math.ceil(
              state.filteredProducts.length / ITEMS_PER_PAGE,
            )}
            handler={handlePagination}
          />
        </div>
      </section>
    </>
  );
}
