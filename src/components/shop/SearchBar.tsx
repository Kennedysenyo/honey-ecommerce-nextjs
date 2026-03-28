"use client";

import { Search } from "lucide-react";
import { ChangeEvent, memo } from "react";

interface Props {
  value: string;
  handler: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = memo(({ value, handler }: Props) => {
  return (
    <div className="absolute top-4 z-30 w-full section-px-one flex ">
      <div className="section-max-w w-full mx-auto flex items-center justify-center sm:justify-end">
        <div className="max-w-xs sm:max-w-sm    w-full relative">
          <span>
            <Search className="icon2 absolute left-4 top-1/2 -translate-y-1/2 text-amber/70" />
          </span>
          <input
            aria-label="Search product"
            placeholder="Search product..."
            name="product"
            className="bg-background pl-10 pr-6 shadow-md text-amber py-2 w-full rounded-full text-sm sm:text-base border-2 border-gold placeholder:text-base placeholder:text-amber/70 focus:outline-none "
            value={value}
            onChange={handler}
          />
        </div>
      </div>
    </div>
  );
});
