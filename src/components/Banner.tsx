"use client";

import { motion } from "motion/react";

interface Props {
  title: string;
  subtitle: string;
  image: string;
}

export const Banner = ({ title, subtitle, image }: Props) => {
  return (
    <div className="h-[60vh] sm:h-[50vh] md:h-[45vh] overflow-hidden relative">
      <img
        className="h-full w-full object-center object-cover object-[center-top] "
        src={image}
        alt=""
      />
      <div className="absolute inset-0 bg-black/45 " />
      <div className="absolute inset-0 z-10 pt-12 flex flex-col justify-center  backdrop-blur-md">
        <div className="section-max-w mx-auto section-px-one">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-6 rounded-2xl text-center text-background w-full space-y-2 md:space-y-4 max-w-4xl mx-auto"
          >
            <h1 className="font-heading title-one text-gold text-shadow-sm">
              {title}
            </h1>
            <p className="subtitle-one">{subtitle}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
