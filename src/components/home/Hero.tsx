"use client";

import { ButtonLink } from "../ButtonLink";
import { motion } from "motion/react";

export const HeroSection = () => {
  return (
    <section className="relative h-fit ">
      <div className=" w-full">
        <video
          className="h-[95vh] min-h-[560px] w-full object-cover"
          autoPlay
          muted
          playsInline
          loop
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          <source src="/videos/hero-video.webm" type="video/webm" />
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 pt-4 sm:pt-6 md:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="py-8 md:py-24   flex flex-col justify-center ">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className=" bg-white/10 h-fit p-5 backdrop-blur-sm md:p-8 rounded-2xl space-y-4 md:space-y-6"
            >
              <div className="max-w-2xl">
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-cream text-center md:text-left title-font title-size-hero text-shadow-md"
                >
                  Pure Natural Honey <br />
                  <span className="text-gold">From the Heart of Ghana</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className=" text-cream text-center md:text-left text-base md:text-2xl xl:text-3xl leading-6 md:leading-8 text-shadow-md "
                >
                  Raw. Unfiltered. 100% Natural. <br />
                  <span className={`hidden xl:block`}>
                    Experience the authentic taste of premium Ghanaian honey,
                    harvested with care and tradition.
                  </span>
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center justify-center md:justify-start gap-4 md:gap-8"
              >
                <ButtonLink href="/shop" label="Shop Now" />

                <ButtonLink
                  href="/contact"
                  label="Contact Us"
                  variant="outline"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
