"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

export const AnimatedButton = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.button
      type="button"
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
        type: "spring",
        stiffness: 300,
        damping: 15,
      }}
    >
      {children}
    </motion.button>
  );
};
