"use client";

import { useCart } from "@/lib/hooks/useCart";
import { Minus, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const CartPreview = () => {
  const router = useRouter();
  const { isOpen, cart, dispatch, subtotalPrice } = useCart();

  useEffect(() => {
    const originalOverflow = document.documentElement.style.overflow;

    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.documentElement.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleContinueShopping = () => {
    dispatch({ type: "CLOSE_CART", payload: false });
    router.back();
  };

  const cartProducts = cart.map((item) => (
    <li
      key={item.product.id}
      className="flex items-center gap-4 p-4 rounded-lg bg-cream shadow-sm"
    >
      <figure className="max-h-[90px] aspect-[1/1] overflow-hidden rounded-lg">
        <img
          src={
            Array.isArray(item.product.image)
              ? item.product.image[0]
              : item.product.image
          }
          alt={item.product.name}
          className="object-cover h-full w-full"
        />
      </figure>
      <div className="flex-1">
        <p className="font-semibold">{item.product.name}</p>
        <p className="text-gold">₵{item.product.price}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() =>
                dispatch({
                  type: "REDUCE_QUANTITY",
                  payload: { id: item.product.id },
                })
              }
              className="hover:text-gold transition-colors duration-300 cursor-pointer"
            >
              <Minus className="icon3" />
            </button>
            <span className="font-semibold text-lg">{item.quantity}</span>
            <button
              onClick={() =>
                dispatch({
                  type: "ADD_QUANTITY",
                  payload: { id: item.product.id },
                })
              }
              className="hover:text-gold transtion-colors duration-300 cursor-pointer"
            >
              <Plus className="icon3" />
            </button>
          </div>
          <button
            onClick={() =>
              dispatch({ type: "REMOVE_ITEM", payload: item.product.id })
            }
            className="text-red-600 underline decoration-dotted underline-offset-4 cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  ));

  return (
    <div
      style={{ display: isOpen ? "flex" : "none" }}
      className="fixed inset-0 z-70 bg-black/30 flex justify-end"
    >
      <div className=" max-w-md w-full bg-background flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h4 className="title-four font-heading font-medium tracking-wide ">
            Shopping Cart
          </h4>
          <button
            onClick={() => dispatch({ type: "CLOSE_CART", payload: false })}
          >
            <X className="icon" />
          </button>
        </div>
        <div className="flex-1 p-8 overflow-auto">
          <ul className="space-y-4">{cartProducts}</ul>
        </div>
        <div className=" space-y-3 p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg">Subtotal:</span>
            <span className="font-semibold text-lg text-gold">
              ₵ {subtotalPrice.toFixed(2)}
            </span>
          </div>
          <button className="block bg-gold w-full px-6 py-3 rounded-full text-background font-bold cursor-pointer ">
            Checkout
          </button>
          <button
            onClick={handleContinueShopping}
            type="button"
            className="block mx-auto text-center cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
