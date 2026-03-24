import { Playfair_Display, Poppins } from "next/font/google";

export const headingFont = Playfair_Display({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

export const bodyFont = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});
