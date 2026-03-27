"use client";

import { motion } from "motion/react";
import { badges, testimonials } from "@/lib/utils/dummy-data/testimonials";
import { Quote, Star } from "lucide-react";

export const Testimonials = () => {
  return (
    <section className="bg-background section-py-one">
      <div className="section-max-w  section-px-one mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="space-y-4 text-center max-w-2xl mx-auto"
        >
          <h2 className="font-heading title-two ">What Our Customers Say</h2>
          <p className="subtitle-two">
            Join thousands of satisfied customers who trust Honey Man for
            premium natural honey.
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 sm:gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.li
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              key={testimonial.name}
              className="relative bg-cream/40 rounded-2xl "
            >
              <span className="absolute top-5 right-5">
                <Quote className="icon-lg2 text-gold/20" />
              </span>
              <div className="rounded-2xl absolute inset-0 bg-gradient-to-br from-cream via-transparent to-white" />

              <div className="relative z-10 overflow-hidden rounded-2xl shadow-md p-6 space-y-3">
                <div className="flex items-center flex-wrap gap-4">
                  <div className="rounded-full overflow-hidden aspect-square size-[60px] border-2 border-gold">
                    <img
                      className="w-full h-full object-cover"
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="icon3"
                      stroke="none"
                      fill="#f4a300"
                    />
                  ))}
                </div>
                <p className="testimonial text-sm font-normal italic leading-6 flex">
                  {testimonial.content}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {badges.map((badge, i) => (
            <motion.li
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: (testimonials.length + i) * 0.1,
              }}
              className="rounded-2xl gradient-to-br p-6 text-center text-cream shadow-md"
              key={badge.id}
            >
              <h4 className="font-heading title-four font-semibold">
                {badge.label}
              </h4>
              <p className="text-sm">{badge.sublabel}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};
