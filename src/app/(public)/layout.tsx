import { CartPreview } from "@/components/CartPreview";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CartProvider } from "@/lib/providers/cartProvider";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CartProvider>
        <CartPreview />
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </CartProvider>
    </>
  );
}
