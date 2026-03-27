"use client";

import { Search } from "lucide-react";
import { memo } from "react";

export const SearchBar = memo(() => {
  return (
    <form className="absolute top-4 z-30 mx-auto w-full section-px-one flex">
      <div className="mx-auto max-w-lg  w-full relative">
        <span>
          <Search className="icon2 text-amber/70 absolute translate-x-[50%] -translate-y-[50%] top-[50%]" />
        </span>
        <input
          aria-label="Search product"
          placeholder="Search product..."
          name="product"
          className="bg-background pl-12 pr-6 text-amber py-3 w-full rounded-full text-sm sm:text-base md:text-lg border-2 border-gold placeholder:text-lg placeholder:text-amber/70 focus:outline-none "
        />
      </div>
    </form>
  );
});
