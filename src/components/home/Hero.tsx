"use client";

import { CheckCircle } from "lucide-react";
import { ButtonLink } from "../ButtonLink";
import { motion } from "motion/react";

export const HeroSection = () => {
  return (
    <section className="relative h-fit ">
      <div className=" w-full">
        <video
          className="min-h-[99vh] sm:min-h-[96vh]  w-full object-cover"
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
        <div className="section-max-w mx-auto h-full flex flex-col justify-center gap-4 md:gap-0">
          <div className="section-px-one grid grid-cols-1 md:grid-cols-2">
            <div className="py-2 sm:py-8 flex flex-col justify-center ">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className=" bg-white/10 h-fit p-5 backdrop-blur-sm p-6 lg:p-8 rounded-2xl space-y-2 sm:space-y-4 lg:space-y-6"
              >
                <div className="max-w-2xl space-y-2">
                  <motion.h1
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-cream text-center md:text-left title-font title-one text-shadow-md"
                  >
                    Pure Natural Honey <br />
                    <span className="text-gold">From the Heart of Ghana</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="subtitle-one text-cream text-center md:text-left  leading-6 md:leading-8 text-shadow-md "
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
                  className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-4 "
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
          <motion.ul
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="section-px-one flex flex-wrap gap-2 sm:gap-4 items-center justify-center  md:justify-start  text-cream text-base md:text-lg"
          >
            <li className="flex items-center gap-2 md:mr-auto">
              <CheckCircle className="icon2 sm:icon text-gold" />
              <span>No Additives</span>
            </li>
            <li className="flex items-center gap-2 md:mr-auto">
              <CheckCircle className="icon2 sm:icon text-gold" />
              <span>Sustainably Sourced</span>
            </li>
            <li className="flex items-center gap-2 md:mr-auto">
              <CheckCircle className="icon2 sm:icon text-gold" />
              <span>Premium Quality</span>
            </li>
          </motion.ul>
        </div>
      </div>
    </section>
  );
};
