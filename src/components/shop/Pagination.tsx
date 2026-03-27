"use client";

import { ITEMS_PER_PAGE } from "@/lib/reducers/products-reducer";
import { memo } from "react";

interface Props {
  numberOfPages: number;
  handler: (start: number, limit: number) => void;
}
export const Pagination = memo(({ numberOfPages, handler }: Props) => {
  const buttonElements = Array.from({ length: numberOfPages }).map((_, i) => (
    <button
      key={i}
      type="button"
      className="px-4 py-2 rounded-md bg-gold hover:bg-amber text-cream shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      onClick={() => {
        const start = ITEMS_PER_PAGE * i;
        const end = ITEMS_PER_PAGE * (i + 1);
        handler(start, end);
      }}
    >
      {i + 1}
    </button>
  ));
  return (
    <div className="flex items-center justify-center gap-2 py-8">
      {buttonElements}
    </div>
  );
});
