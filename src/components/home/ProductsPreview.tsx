"use client";

import { motion } from "motion/react";
import { products } from "@/lib/utils/dummy-data/products";
import { ButtonLink } from "../ButtonLink";
import { ProductsList } from "../ProductsList";

export const ProductsPreview = () => {
  return (
    <section className="section-py-one bg-background">
      <div className="section-max-w mx-auto section-px-one  ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="font-heading title-two text-center">
            Our Premium <span className="text-gold">Honey Collection</span>
          </h2>
          <p className="text-center subtitle-two">
            Discover our carefully curated selection of pure, natural honey
            products
          </p>
        </motion.div>

        <ProductsList products={products} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: products.length * 0.1 }}
        >
          <ButtonLink
            href="/shop"
            label="View All Products"
            className="mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};
