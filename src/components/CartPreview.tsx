"use client";

import { useCart } from "@/lib/hooks/useCart";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export const CartPreview = () => {
  const { isOpen, cart, dispatch, subtotalPrice } = useCart();

  useEffect(() => {
    const originalOverflow = document.documentElement.style.overflow;

    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = originalOverflow;
    }

    return () => {
      document.documentElement.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleCloseCart = () => {
    dispatch({ type: "CLOSE_CART", payload: false });
  };

  const cartProducts = cart.map((item) => (
    <li
      key={item.product.id}
      className="flex items-center gap-4 rounded-lg bg-cream p-4 shadow-sm"
    >
      <figure className="aspect-square max-h-[90px] overflow-hidden rounded-lg">
        <img
          src={
            Array.isArray(item.product.image)
              ? item.product.image[0]
              : item.product.image
          }
          alt={item.product.name}
          className="h-full w-full object-cover"
        />
      </figure>

      <div className="flex-1">
        <p className="font-semibold">{item.product.name}</p>
        <p className="text-gold">₵{item.product.price}</p>

        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-3 md:gap-6">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() =>
                dispatch({
                  type: "REDUCE_QUANTITY",
                  payload: { id: item.product.id },
                })
              }
              className="cursor-pointer transition-colors duration-300 hover:text-gold"
            >
              <Minus className="icon3" />
            </button>

            <span className="text-lg font-semibold">{item.quantity}</span>

            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() =>
                dispatch({
                  type: "ADD_QUANTITY",
                  payload: { id: item.product.id },
                })
              }
              className="cursor-pointer transition-colors duration-300 hover:text-gold"
            >
              <Plus className="icon3" />
            </button>
          </div>

          <button
            type="button"
            onClick={() =>
              dispatch({ type: "REMOVE_ITEM", payload: item.product.id })
            }
            className="cursor-pointer text-red-600 underline decoration-dotted underline-offset-4"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  ));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-70 flex justify-end bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={handleCloseCart}
        >
          <motion.div
            className="flex w-full max-w-md flex-col bg-background"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              <h4 className="title-four font-heading font-medium tracking-wide">
                Shopping Cart
              </h4>

              <button
                type="button"
                aria-label="Close cart"
                onClick={handleCloseCart}
              >
                <X className="icon" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
              {cart.length !== 0 ? (
                <>
                  <ul className="space-y-4 h-full">{cartProducts}</ul>
                </>
              ) : (
                <div className="flex flex-col justify-center items-center h-full gap-4">
                  <span className="text-gold/30">
                    <ShoppingBag size={70} />
                  </span>
                  <p className="font-semibold text-xl">Your cart is empty</p>
                  <p className="text-xs">
                    Add some delicious honey to get started!
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3 border-t border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Subtotal:</span>
                <span className="text-lg font-semibold text-gold">
                  ₵ {subtotalPrice.toFixed(2)}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, background: "#c46b00" }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="block w-full cursor-pointer rounded-full bg-gold px-6 py-3 font-bold text-background"
              >
                Checkout
              </motion.button>

              <button
                onClick={handleCloseCart}
                type="button"
                className="mx-auto block cursor-pointer text-center"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
