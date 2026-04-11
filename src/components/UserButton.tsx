"use client";

import { CircleUser } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { SignOutButton } from "./SignOutButton";

interface Props {
  scrolled: boolean;
}

export const UserButton = ({ scrolled }: Props) => {
  const [open, setOpen] = useState(false);

  const handClickOutClick = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div
          onClick={handClickOutClick}
          className={`${open ? "visible" : "hidden"} fixed h-screen w-screen -left-[0%] -z-40`}
        />
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`${scrolled ? "text-foreground" : "text-background"} cursor-pointer relative`}
        >
          <CircleUser className="icon" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              className="absolute -right-20 sm:-right-15 md:-right-10 lg:-right-5 xl:right-0 mt-2 w-48 bg-background z-50 rounded-sm"
            >
              <ul className="">
                <li className=" border-t border-gray-100">
                  <Link
                    className="w-full inline-block py-1 px-3 hover:bg-cream/90 transition-colors duration-300"
                    href="/orders"
                  >
                    Orders
                  </Link>
                </li>
                <li className=" border-t border-gray-100">
                  <Link
                    className="w-full inline-block py-1 px-3 hover:bg-cream/90 transition-colors duration-300"
                    href="/settings"
                  >
                    Settings
                  </Link>
                </li>
                <li className=" border-t border-gray-100">
                  <SignOutButton />
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
