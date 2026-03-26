import { Mail, Send } from "lucide-react";

export const CallToAction = () => {
  return (
    <section className="relative bg-amber/90 ">
      <div className="absolute inset-0  bg-honey-pattern2" />
      <div className="absolute inset-0  bg-gradient-to-br from-accent-gold/95  to-amber/50" />

      <div className="relative inset-0 z-30 section-max-w mx-auto section-py-one section-px-one space-y-6 flex flex-col items-center">
        <span className="bg-white p-4 rounded-full shadow-md">
          <Mail className="icon-lg2 text-gold" />
        </span>
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="font-heading title-two text-white ">
            Join the Honey Circle
          </h2>
          <p className="text-white subtitle-two">
            Subscribe to receive exclusive offers, early access to new products,
            and insights into sustainable beekeeping practices.
          </p>
        </div>

        <div className="w-full max-w-2xl  grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-0 md:gap-x-4">
          <input
            type="text"
            aria-label="email"
            placeholder="Enter your email address"
            className="col-span-2 text-base md:text-lg backdrop-blur-sm border-2 border-white focus:outline-none px-6 py-2 leading-8 rounded-full text-cream shadow-md"
          />
          <button className="px-6 py-3 text-base font-semibold text-gold cursor-pointer text-lg flex items-center justify-center gap-2 bg-white rounded-full shadow-md w-full">
            Subscrbe <Send className="icon" />
          </button>
        </div>

        <div>
          <ul className="list disc-white flex items-center gap-8 list text-white">
            <li>Early Discounts</li>
            <li>Exclusive Offers</li>
            <li>Beekeeping Insights</li>
          </ul>
        </div>

        <p className="text-sm text-cream/80">
          We respenct your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};
