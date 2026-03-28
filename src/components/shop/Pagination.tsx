"use client";

import { ITEMS_PER_PAGE } from "@/lib/reducers/products-reducer";
import { memo, useMemo, useState, useEffect } from "react";

interface Props {
  numberOfPages: number;
  handler: (start: number, end: number) => void;
}

type PaginationItem = number | "...";

export const Pagination = memo(({ numberOfPages, handler }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    handler(start, end);
  }, [currentPage, handler]);

  useEffect(() => {
    if (currentPage > numberOfPages) {
      setCurrentPage(numberOfPages || 1);
    }
  }, [numberOfPages, currentPage]);

  const paginationItems = useMemo(() => {
    const items: PaginationItem[] = [];

    if (numberOfPages <= 7) {
      for (let i = 1; i <= numberOfPages; i++) {
        items.push(i);
      }
      return items;
    }

    items.push(1);

    if (currentPage <= 4) {
      items.push(2, 3, 4, 5, "...", numberOfPages);
      return items;
    }

    if (currentPage >= numberOfPages - 3) {
      items.push(
        "...",
        numberOfPages - 4,
        numberOfPages - 3,
        numberOfPages - 2,
        numberOfPages - 1,
        numberOfPages,
      );
      return items;
    }

    items.push(
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      numberOfPages,
    );

    return items;
  }, [currentPage, numberOfPages]);

  const goToPage = (page: number) => {
    if (page < 1 || page > numberOfPages || page === currentPage) return;
    setCurrentPage(page);
  };

  if (numberOfPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-2 py-8"
    >
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>

      {paginationItems.map((item, index) =>
        item === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 py-2 text-sm text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => goToPage(item)}
            aria-current={currentPage === item ? "page" : undefined}
            className={`min-w-10 rounded-md px-4 py-2 text-sm font-medium shadow-sm transition ${
              currentPage === item
                ? "bg-cream text-gold ring-2 ring-gold"
                : "bg-gold text-cream hover:bg-amber hover:-translate-y-1 hover:shadow-md"
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === numberOfPages}
        className="rounded-md border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
});

Pagination.displayName = "Pagination";
