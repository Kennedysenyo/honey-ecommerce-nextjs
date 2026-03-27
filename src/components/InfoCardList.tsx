"use client";
import { LucideProps } from "lucide-react";
import { motion } from "motion/react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface Props {
  features: {
    id: number;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    title: string;
    description: string;
  }[];
}

export const InfoCardList = ({ features }: Props) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {features.map((feature, i) => (
        <motion.li
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: i * 0.1 }}
          key={feature.id}
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
  );
};
