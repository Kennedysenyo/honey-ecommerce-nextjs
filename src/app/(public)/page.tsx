import { CallToAction } from "@/components/CallToAction";
import { HeroSection } from "@/components/home/Hero";
import { OurStory } from "@/components/home/OurStory";
import { ProductsPreview } from "@/components/home/ProductsPreview";
import { Testimonials } from "@/components/home/Testimonials";

// TODO : Optimize images and videos to make page load faster

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductsPreview />
      <OurStory />
      <Testimonials />
      <CallToAction />
    </>
  );
}
