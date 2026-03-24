import Link from "next/link";
import { ButtonLink } from "../ButtonLink";

export const HeroSection = () => {
  return (
    <section className="relative">
      <div className=" w-full">
        <video className="w-full aspect-video" autoPlay muted playsInline loop>
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          <source src="/videos/hero-video.webm" type="video/webm" />
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 pt-4 sm:pt-6 md:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="py-8 md:py-24   flex flex-col justify-center ">
            <div className=" bg-white/20 h-fit p-2 md:p-4 rounded space-y-2 md:space-y-3 lg:space-y-6">
              <h1 className="text-cream title-font title-size-hero text-shadow-md">
                Pure Natural Honey <br />
                <span className="text-gold">From the Heart of Ghana</span>
              </h1>
              <p className="w-fit text-cream text-base md:text-2xl xl:text-3xl leading-4 md:leading-10 text-shadow-md ">
                Raw. Unfiltered. 100% Natural. <br />
                <span className={`hidden xl:block`}>
                  Experience the authentic taste of premium Ghanain honey,
                  harvested with care and tradition.
                </span>
              </p>
              <div className="w-fit flex items-center gap-4 md:gap-8">
                <ButtonLink href="/shop" label="Shop Now" />

                <ButtonLink
                  href="/contacts"
                  label="Contact Us"
                  variant="outline"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
