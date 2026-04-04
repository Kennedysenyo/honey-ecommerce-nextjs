import { useContext, useEffect, useMemo } from "react";
import { cartContext } from "../contexts/cartContext";

export const useCart = () => {
  const cart = useContext(cartContext);
  if (!cart) {
    throw new Error("cartContext must be used in a cartProvider!");
  }

  const totalQuantity = useMemo(
    () => cart.cart.reduce((acc, curr) => (acc += curr.quantity), 0),
    [cart.cart],
  );

  const subtotalPrice = useMemo(
    () =>
      cart.cart.reduce(
        (acc, curr) => (acc += curr.product.price * curr.quantity),
        0,
      ),
    [cart.cart],
  );

  return {
    cart: cart.cart,
    dispatch: cart.dispatch,
    totalQuantity,
    isOpen: cart.isOpen,
    subtotalPrice,
  };
};
