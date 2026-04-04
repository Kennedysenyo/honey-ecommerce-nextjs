"use client";

import { useCart } from "@/lib/hooks/useCart";
import { ShoppingCart } from "lucide-react";

interface Props {
  scrolled: boolean;
}
export const CartButton = ({ scrolled }: Props) => {
  const { totalQuantity, dispatch } = useCart();

  return (
    <button
      onClick={() => dispatch({ type: "OPEN_CART", payload: true })}
      className={`${scrolled ? "hover:bg-cream" : "bg-cream/20"} group md:mr-8 p-2 md:p-3 rounded-full relative`}
    >
      <ShoppingCart
        className={`icon3 ${scrolled ? "" : "text-cream "} group-hover:text-accent-gold `}
      />
      <span
        className={` absolute top-0 text-xs right-0 text-background text-bold px-[6px] py-[2px] bg-gold rounded-full`}
      >
        {totalQuantity}
      </span>
    </button>
  );
};
