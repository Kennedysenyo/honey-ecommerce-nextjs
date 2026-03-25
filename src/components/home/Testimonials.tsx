import { badges, testimonials } from "@/lib/utils/dummy-data/testimonials";
import { Quote, Star } from "lucide-react";

export const Testimonials = () => {
  return (
    <section className="bg-background">
      <div className="section-max-w section-py-one section-px-one mx-auto space-y-16">
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <h2 className="font-heading title-two ">What Our Customers Say</h2>
          <p className="subtitle-two">
            Join thousands of satisfied customers who trust Honey Man for
            premium natural honey.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 sm:gap-8">
          {testimonials.map((testimonial) => (
            <li key={testimonial.name} className="relative bg-cream/40 over">
              <span className="absolute top-5 right-5">
                <Quote className="icon-lg2 text-gold/20" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-br from-cream via-transparent to-white" />

              <div className="relative inset-0 z-10 overflow-hidden rounded-2xl shadow-md p-6 space-y-3">
                <div className="flex items-center wrap gap-4">
                  <div className="rounded-full overflow-hidden aspect-square max-w-[60px] border-2 border-gold">
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
                <p className="testimonial text-sm font-normal italic leading-5 flex wrap">
                  {testimonial.content}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {badges.map((badge) => (
            <li
              className="rounded-2xl gradient-to-br p-6 text-center text-cream"
              key={badge.label}
            >
              <h4 className="font-heading title-four font-semibold">
                {badge.label}
              </h4>{" "}
              <p className="text-sm">{badge.sublabel}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
