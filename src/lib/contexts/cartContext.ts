import { CartItem } from "@/types/types";
import { createContext } from "react";
import { CartAction } from "../reducers/cartReducer";

interface Cart {
  isOpen: boolean;
  cart: CartItem[];
  dispatch: (action: CartAction) => void;
}

export const cartContext = createContext<Cart | null>(null);
