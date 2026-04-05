"use client";
import { Banner } from "@/components/Banner";
import { CallToAction } from "@/components/CallToAction";
import { InfoCardList } from "@/components/InfoCardList";
import { values } from "@/lib/utils/dummy-data/values";
import { motion } from "motion/react";
export const badges = [
  { id: 1, label: "150+", sublabel: "Parner Beekeepers" },
  { id: 2, label: "50,000", sublabel: "Jars Sold Annually" },
  { id: 3, label: "25+", sublabel: "Communities Supported" },
];

export default function OurStoryPage() {
  return (
    <>
      <Banner
        title="Our Story"
        subtitle="Honey Man founded on a simple belief: that nature's gifts should be shared in their purest form."
        image="/assets/images/story-banner.jpg"
      />

      <section className="section-py-one bg-white">
        <div className="section-max-w mx-auto section-px-one">
          <div className="space-y-24">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <motion.figure
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                className="overflow-hidden rounded-2xl"
              >
                <img
                  src="/assets/images/bee-keepers.jpg"
                  alt="Bee Keepers"
                  className="w-full h-full object-cover"
                />
              </motion.figure>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                className="space-y-4 md:space-y-6 p-6 md:p-8"
              >
                <h2 className="font-heading title-two">The Beginning</h2>
                <p className="leading-7 text-base">
                  Our journey began in the lush forests of Ghana, where local
                  beekeepers have been harvesting honey for generations. We saw
                  an opportunity to bring this liquid gold to the world while
                  preserving traditional methods and supporting local
                  communities.
                </p>
                <p className="leading-7 text-base">
                  What started as a small operation with a handful of beekeepers
                  has grown into a thriving network of sustainable apiaries
                  across Ghana. Each partner shares our commitment to quality,
                  environmental stewardship, and fair trade.
                </p>
                <p className="leading-7 text-base">
                  Today, Honey Man Ghana stands as a testament to what's
                  possible when tradition meets innovation, and when profit is
                  balanced with purpose.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col justify-center p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <h2 className="font-heading title-two">Our Process</h2>
                  <p className="leading-7 text-base">
                    We believe in minimal intervention. Our honey is harvested
                    at peak maturity, strained only to remove larger debris, and
                    never heated or ultra-filtered. This preserves the natural
                    enzymes, pollen, and nutrients that make raw honey so
                    beneficial.
                  </p>
                  <p className="leading-7 text-base">
                    Each batch is carefully tested for purity and quality. We
                    can trace every jar back to its source apiary, ensuring
                    complete transparency and accountability.
                  </p>
                  <ul className="list disc-gold space-y-2">
                    <li>Hand-harvested</li>
                    <li>Minimally processed</li>
                    <li>Quality tested</li>
                    <li>Sustainably packaged</li>
                  </ul>
                </motion.div>
              </div>
              <motion.figure
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="aspect-1/2 overflow-hidden rounded-2xl"
              >
                <img
                  src="/assets/images/honey.jpg"
                  alt="Beekeeper"
                  className="w-full h-full object-cover"
                />
              </motion.figure>
            </div>
          </div>
        </div>
      </section>

      <section className="section-py-one bg-cream ">
        <div className="section-max-w mx-auto space-y-12 md:space-y-16 section-px-one">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto w-fit text-center space-y-4 md:space-y-6"
          >
            <h2 className="font-heading title-two">
              Our Core <span className="text-gold">Values</span>
            </h2>
            <p className="subtitle-two">
              These principles guide every decision we make and every jar we
              produce.
            </p>
          </motion.div>
          <InfoCardList features={values} />
        </div>
      </section>

      <section className="section-py-one">
        <div className="section-max-w mx-auto section-px-one space-y-8 md:space-y-12">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center font-heading title-two"
          >
            Our <span className="text-gold">Impact</span>
          </motion.h2>

          <ul className="grid grid-cols-1 smd:grid-cols-2 md:grid-cols-3 gap-6 ">
            {badges.map((badge, i) => (
              <motion.li
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                }}
                className="rounded-2xl gradient-to-br p-6 text-center text-cream shadow-md"
                key={badge.id}
              >
                <h2 className="font-heading title-three font-semibold">
                  {badge.label}
                </h2>
                <p className="text-sm leading-8">{badge.sublabel}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
