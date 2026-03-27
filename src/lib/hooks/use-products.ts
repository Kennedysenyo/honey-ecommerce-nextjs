"use client";

import { ProductsState } from "@/types/types";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { productsReducer } from "../reducers/products-reducer";

export const useProducts = () => {
  const initialState: ProductsState = {
    loading: true,
    error: null,
    products: [],
    filteredProducts: [],
    paginatedProducts: [],
  };

  const [state, dispatch] = useReducer(productsReducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch({ type: "LOADING" });

        const response = await fetch("/api/products");

        if (!response.ok) {
          dispatch({ type: "ERROR", payload: "An Error Occured" });
          return;
        }

        const data = await response.json();

        dispatch({ type: "PRODUCTS_FETCHED", payload: data.products });
      } catch (error) {
        dispatch({
          type: "ERROR",
          payload: error instanceof Error ? error.message : (error as string),
        });
      }
    };

    fetchProducts();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      const value = e.target.value;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setSearchTerm(value);

      timeoutRef.current = setTimeout(() => {
        dispatch({ type: "FILTER", payload: value });
      }, 300);
    },
    [],
  );

  const handlePagination = (start: number, limit: number) => {
    dispatch({ type: "PAGINATE", payload: [Math.max(0, start), limit] });
  };

  return { state, searchTerm, handleSearch, handlePagination };
};
