"use client";

import { features } from "@/lib/utils/dummy-data/features";
import { motion } from "motion/react";

export const OurStory = () => {
  return (
    <section className=" relative bg-cream ">
      {/* Honey Pattern */}
      <div className="absolute inset-0 bg-honey-pattern opacity-60" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/60" />

      {/* Content */}
      <div className="relative z-10 section-max-w  mx-auto section-py-one section-px-one space-y-12 md:space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center space-y-6 max-w-3xl mx-auto"
        >
          <h2 className="title-two font-heading">
            The <span className="text-gold">Honey Man</span> Story
          </h2>
          <p className="subtitle-two">
            From the lush forests of Ghana to your table, we bring you the
            finest natural honey. Our commitment to quality, sustainability, and
            community drives everything we do.
          </p>
        </motion.div>

        <div className="overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="min-h-[500px] rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              className="w-full h-full object-cover"
              src="/images/honey-harvesting.jpg"
              alt="Honey harvesting"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="flex flex-col justify-center gap-8"
          >
            <div className="space-y-4 max-w-3xl">
              <h3 className="title-three font-heading">
                Pure. Natural. Authentic
              </h3>
              <p className="text-base md:text-lg leading-6 md:leading-7">
                Honey Man was born from a simple vision: to share the
                exceptional quality of Ghanaian honey with the world. Our honey
                is harvested from pristine forests, where bees gather nectar
                from diverse wildflowers and ancient trees. <br /> <br />
                We work directly with the local beekeepers who have perfected
                their craft over generations. Every jar represents their
                dedication, skill, and deep respect for nature. Our honey is
                never heated, never filtered excessively, and never adulterated
                - just pure, raw honey as nature intended.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="flex items-center gap-4 title-four font-semibold promise">
                <span>Our Promise</span>
              </h4>
              <ul className="list space-y-2 text-base leading-6 tracking-normal">
                <li>100% Pure & Natural</li>
                <li>No Artificial Additives</li>
                <li>Ethically Sourced</li>
                <li>Quality Guaranteed</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.li
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: i * 0.1 }}
              key={feature.title}
              className="text-center flex flex-col items-center gap-4 p-6 rounded-2xl bg-white shadow-md "
            >
              <span className="p-4 text-cream gradient-to-br rounded-full">
                <feature.icon className="icon-lg" />
              </span>
              <h3 className="title-four font-semibold">{feature.title}</h3>
              <p className="text-sm leading-6">{feature.description}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};
