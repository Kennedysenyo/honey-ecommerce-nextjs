"use client";

import { ReactNode, useReducer } from "react";
import { cartContext } from "../contexts/cartContext";
import { cartReducer, CartState } from "../reducers/cartReducer";
import { CartItem } from "@/types/types";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const initialCartState: CartState = { isOpen: false, cart: [] };

  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  return (
    <cartContext.Provider
      value={{ isOpen: state.isOpen, cart: state.cart, dispatch }}
    >
      {children}
    </cartContext.Provider>
  );
};
