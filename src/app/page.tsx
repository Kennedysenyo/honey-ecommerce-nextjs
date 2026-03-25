import { HeroSection } from "@/components/home/Hero";
import { OurStory } from "@/components/home/OurStory";
import { ProductsPreview } from "@/components/home/ProductsPreview";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductsPreview />
      <OurStory />
      <Testimonials />
    </>
  );
}
