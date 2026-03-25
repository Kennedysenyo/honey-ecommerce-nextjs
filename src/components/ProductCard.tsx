"use client";

import { Product } from "@/types/types";
import Link from "next/link";

export const ProductCard = ({
  id,
  name,
  description,
  size,
  price,
  image,
}: Omit<Product, "benefits" | "ingredients">) => {
  return (
    <li className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      <Link href={`/product/${id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          <img
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            src={image}
            alt={name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration"></div>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <Link href={`/product/${id}`}>
            <h3 className="font-heading font-semibold title-four group-hover:text-gold transition-colors">
              {name}
            </h3>
          </Link>
        </div>
        <p className="text-sm text-gray-600 mb-2">{size}</p>
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{description}</p>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">{price}</span>
          <button
            onClick={() => {
              id;
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </li>
  );
};
