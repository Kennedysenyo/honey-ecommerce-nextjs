"use client";

import { ProductsState } from "@/types/types";
import { useEffect, useReducer } from "react";
import { productsReducer } from "../reducers/products-reducer";

export const useProducts = () => {
  const initialState: ProductsState = {
    loading: true,
    error: null,
    products: [],
    filteredProducts: [],
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

  return state;
};
