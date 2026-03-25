"use client";

import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

interface Props {
  href: string;
  label: string;
  variant?: "outline";
  className?: string;
}

const iconVariants = {
  idle: { rotate: 0 },
  wiggle: {
    rotate: [0, -10, 10, -6, 6, 0],
    transition: { duration: 0.4 },
  },
};

export const ButtonLink = ({ href, label, variant, className }: Props) => {
  if (variant === "outline") {
    return (
      <motion.div initial="idle" whileHover="wiggle">
        <Link
          href={href}
          className={`${className} w-fit group flex items-center gap-2 cta-btn-p cta-btn2-text rounded-full border-2 border-gold bg-white text-gold transition-all duration-300 hover:bg-amber hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60`}
        >
          <span>Contact Us</span>

          <motion.span variants={iconVariants}>
            <Phone className="icon3" />
          </motion.span>
        </Link>
      </motion.div>
    );
  }
  return (
    <>
      <Link
        href={href}
        className={`${className} w-fit flex items-center gap-2 group cta-btn-p cta-btn-text rounded-full bg-gold text-cream shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60`}
      >
        {label}
        <ArrowRight className="icon3 group-hover:translate-x-[25%] transition-translate duration-300" />
      </Link>
    </>
  );
};
