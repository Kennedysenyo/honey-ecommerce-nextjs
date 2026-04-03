"use client";

import { Product } from "@/types/types";
import { ArrowLeft, Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProductImagesPreview } from "./ProductImagesPreview";
import { useState } from "react";
import { motion } from "motion/react";

interface Props {
  product: Product;
}

export const ProductDetails = ({ product }: Props) => {
  const router = useRouter();
  const [count, setCount] = useState(0);

  return (
    <>
      <section className="min-h-screen flex flex-col">
        <figure className="h-[99px]  w-full relative">
          <img
            className="w-full h-full object-cover"
            src={
              Array.isArray(product.image) ? product.image[0] : product.image
            }
            alt=""
          />
          <div className="absolute inset-0 bg-linear-to-t from-cream from-20% via-40% via-black/20 to-transparent" />
        </figure>
        <div className="py-3 flex-1 bg-cream/90 ">
          <div className="w-full section-max-w section-px-one mx-auto mb-6">
            <button
              className="flex items-center gap-2 rounded-md text-xs md:text-sm hover:text-gold transition-colors duration-300 cursor-pointer "
              type="button"
              onClick={() => router.back()}
            >
              <ArrowLeft className="icon3" /> Back
            </button>
          </div>
          <div className="flex-1 section-px-one section-max-w mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full ">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <ProductImagesPreview
                images={product.image}
                name={product.name}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="px-8"
            >
              <div className="space-y-8">
                <h1 className="title-one font-heading">{product.name}</h1>

                <p className="font-medium">
                  <span className="title-two font-bold text-gold">
                    {product.price}
                  </span>
                  /<span>{product.size}</span>
                </p>
                <p className="font-medium leading-8">{product.description}</p>
                <div>
                  <h3 className="font-heading title-three mb-4">Ingredients</h3>
                  <ul className="grid grid-cols-2 gap-4">
                    {product.benefits.map((ben, i) => (
                      <li
                        key={i}
                        className="font-medium flex items-center gap-2"
                      >
                        <Check className="icon3 text-gold" /> {ben}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-gold/10 rounded-lg space-y-2">
                  <p className="font-medium">Ingredients:</p>
                  <p>{product.ingredients}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">Quantity:</span>{" "}
                  <div className="flex items-center bg-background gap-4 rounded-full overflow-hidden shadow-md">
                    <button
                      onClick={() => setCount((prev) => Math.max(0, prev - 1))}
                      className="text-2xl cursor-pointer px-4 py-2 border-r border-gray-200"
                    >
                      <Minus className="icon3" />
                    </button>
                    <span className="text-2xl">{count}</span>
                    <button
                      onClick={() =>
                        setCount((prev) => Math.min(500, prev + 1))
                      }
                      className="text-2xl cursor-pointer px-4 py-2  border-l border-gray-200"
                    >
                      <Plus className="icon3" />
                    </button>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                  type="button"
                  className="px-6 py-3 flex items-center cursor-pointer gap-2 justify-center w-full bg-gold text-background text-lg rounded-full"
                >
                  <ShoppingCart className="icon3" />
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <div>The Similar product section</div>
    </>
  );
};
