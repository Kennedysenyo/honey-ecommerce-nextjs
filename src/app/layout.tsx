import type { Metadata } from "next";
import "./globals.css";
import { bodyFont, headingFont } from "./fonts/fonts";

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
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main> {children}</main>
      </body>
    </html>
  );
}
