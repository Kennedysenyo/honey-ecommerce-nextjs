"use client";

import { motion } from "motion/react";
import { Mail, Send } from "lucide-react";

export const CallToAction = () => {
  return (
    <section className="relative bg-amber/90 ">
      <div className="absolute inset-0  bg-honey-pattern2" />
      <div className="absolute inset-0  bg-gradient-to-br from-accent-gold/70 from-5% via-amber/50 via-50% to-transparent" />

      <div className="relative inset-0 z-30 section-max-w mx-auto section-py-one section-px-one space-y-6 flex flex-col items-center">
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1.1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white p-4 rounded-full shadow-md"
        >
          <Mail className="icon-lg2 text-gold" />
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto space-y-4"
        >
          <h2 className="font-heading title-two text-white ">
            Join the Honey Circle
          </h2>
          <p className="text-white subtitle-two">
            Subscribe to receive exclusive offers, early access to new products,
            and insights into sustainable beekeeping practices.
          </p>
        </motion.div>

        <form className="w-full max-w-2xl  grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-0 md:gap-x-4">
          <motion.input
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            type="email"
            aria-label="Email Address"
            placeholder="Enter your email address"
            className="col-span-2 text-base md:text-lg backdrop-blur-sm border-2 border-white focus:outline-none px-6 py-2 leading-8 rounded-full h-12 md:h-14 text-white placeholder:text-white/70 shadow-md"
          />
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            onClick={(e) => e.preventDefault()}
            className="px-6 py-3 text-base font-semibold text-gold cursor-pointer text-lg flex items-center justify-center gap-2 bg-white h-12 md:h-14 rounded-full shadow-md w-full items-center gap-2 rounded-full bg-gold hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 cursor-pointer transition-all duration-300"
          >
            Subscribe <Send className="icon" />
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ul className="list disc-white flex flex-wrap justify-center items-center gap-4 md:gap-8 text-white">
            <li>Early Discounts</li>
            <li>Exclusive Offers</li>
            <li>Beekeeping Insights</li>
          </ul>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-sm text-cream/85"
        >
          We respect your privacy. Unsubscribe anytime.
        </motion.p>
      </div>
    </section>
  );
};
