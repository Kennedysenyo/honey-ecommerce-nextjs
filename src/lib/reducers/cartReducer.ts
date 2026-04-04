import { CartItem } from "@/types/types";

export type CartState = {
  cart: CartItem[];
  isOpen: boolean;
};

export type CartAction =
  | {
      type: "ADD_PRODUCT";
      payload: CartItem;
    }
  | { type: "REMOVE_ITEM"; payload: string }
  | {
      type: "ADD_QUANTITY";
      payload: { id: string };
    }
  | {
      type: "REDUCE_QUANTITY";
      payload: { id: string };
    }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART"; payload: true }
  | { type: "CLOSE_CART"; payload: false };

export const cartReducer = (
  state: CartState,
  action: CartAction,
): CartState => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const existing = state.cart.find(
        (item) => item.product.id === action.payload.product.id,
      );

      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case "ADD_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };

    case "REDUCE_QUANTITY":
      return {
        ...state,
        cart: state.cart.flatMap((item) => {
          if (item.product.id !== action.payload.id) return item;

          if (item.quantity === 1) return [];

          return { ...item, quantity: item.quantity - 1 };
        }),
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "OPEN_CART":
      return { ...state, isOpen: action.payload };
    case "CLOSE_CART":
      return { ...state, isOpen: action.payload };

    default:
      throw new Error("Unknown Action Taken");
  }
};
