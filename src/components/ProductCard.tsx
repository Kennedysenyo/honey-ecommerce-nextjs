"use client";

import { Product } from "@/types/types";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

interface Props {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index = 0 }: Props) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          <img
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            src={product.image}
            alt={product.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-heading font-semibold title-four group-hover:text-gold transition-colors duration-300">
              {product.name}
            </h3>
          </Link>
        </div>
        <p className="text-sm text-gray-600 mb-2">{product.size}</p>
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between flex-wrap items-center gap-2">
          <span className="text-xl font-bold text-gold">₵{product.price}</span>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-gold hover:bg-amber hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 cursor-pointer transition-all duration-300 cta-btn-p text-cream leading-tight"
            onClick={() => {
              product.id;
            }}
          >
            <ShoppingCart className="icon3" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.li>
  );
};
