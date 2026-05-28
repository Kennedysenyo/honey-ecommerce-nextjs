import type { Metadata } from "next";
import "./globals.css";
import { bodyFont, headingFont } from "./fonts/fonts";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

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
      className={cn("antialiased", headingFont.variable, bodyFont.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-screen flex flex-col ">
        <main className="flex-1 flex flex-col"> {children}</main>
      </body>
    </html>
  );
}
