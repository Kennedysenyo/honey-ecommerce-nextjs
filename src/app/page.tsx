import { HeroSection } from "@/components/home/Hero";
import { OurStory } from "@/components/home/OurStory";
import { ProductsPreview } from "@/components/home/ProductsPreview";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductsPreview />
      <OurStory />
    </>
  );
}
