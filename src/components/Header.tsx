"use client";

import { Menu, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/shop", label: "Shop" },
  { path: "/our-story", label: "Our Story" },
  { path: "/contact", label: "Contact" },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const navLinksElements = NAV_LINKS.map((link) => (
    <li key={link.path}>
      <Link
        className={`${pathname === link.path ? "text-gold" : scrolled ? "" : "text-cream text-shadow-sm"} hover:text-gold`}
        href={link.path}
      >
        {link.label}
      </Link>
    </li>
  ));

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 h-fit transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center ${isMobileOpen ? "bg-white" : ""}`}
        >
          <Link className="title-size-subsection title-font " href="/">
            <div className="flex gap-2 text-center">
              <span className=" text-gold font-semibold">Honey Man</span>
              <span
                className={` ${scrolled ? "" : isMobileOpen ? "text-foreground" : "text-cream"}`}
              >
                Ghana
              </span>
            </div>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 text-lg font-semibold leading-8">
              {navLinksElements}
            </ul>
          </nav>

          <div className="flex items-center gap-8">
            {!isMobileOpen && (
              <button
                className={`${scrolled ? "hover:bg-cream" : "bg-cream/20"} group md:mr-8 p-2 md:p-3 rounded-full  `}
              >
                <ShoppingCart
                  className={`icon2 ${scrolled ? "" : "text-cream "} group-hover:text-accent-gold `}
                />
              </button>
            )}

            <button
              className="md:hidden"
              onClick={() => setIsMobileOpen((prev) => !prev)}
            >
              {isMobileOpen ? (
                <X
                  className={`icon ${scrolled ? "" : isMobileOpen ? "" : "text-cream"} `}
                />
              ) : (
                <Menu
                  className={`icon ${scrolled ? "" : isMobileOpen ? "" : "text-cream"} `}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className=" md:hidden bg-white shadow-lg border-t border-gold/20"
            >
              <motion.ul
                variants={container}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="p-4 text-lg  space-y-3"
              >
                {NAV_LINKS.map((link) => (
                  <motion.li
                    variants={item}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className=" font-medium"
                    key={link.path}
                  >
                    <Link
                      className={`${pathname === link.path ? "text-gold bg-cream" : ""} text-foreground transition-colors rounded-lg hover:bg-cream py-2 block px-4`}
                      href={link.path}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`${isMobileOpen ? "fixed bg-black/20 inset-0 z-40" : "hidden"}`}
        onClick={() => setIsMobileOpen(false)}
      ></motion.div>
    </>
  );
};
