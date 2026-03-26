import type { Metadata } from "next";
import "./globals.css";
import { bodyFont, headingFont } from "./fonts/fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Honey Man",
  description: "Pure honey from Ghana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col ">
        <Header />
        <main className="flex-1 "> {children}</main>
        <Footer />
      </body>
    </html>
  );
}
