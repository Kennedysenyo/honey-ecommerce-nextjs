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
      className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col ">
        <main className="flex-1 flex flex-col"> {children}</main>
      </body>
    </html>
  );
}
