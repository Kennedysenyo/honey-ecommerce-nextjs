import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { FiFacebook } from "react-icons/fi";
import { PiInstagramLogo } from "react-icons/pi";
import { RiTwitterXLine } from "react-icons/ri";

export const Footer = () => {
  return (
    <footer className="section-py-one bg-foreground">
      <div className="section-max-w text-cream/90 section-px-one mx-auto space-y-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4 ">
            <h4 className="font-heading title-four text-gold">
              Honey Man <span className="text-background">Ghana</span>
            </h4>
            <p className="text-base max-w-lg leading-7">
              Premium natural honey from the heart of Ghana. Pure, raw, and
              sustainably sourced.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                aria-label="Facebook"
                className="rounded-full bg-cream/15 p-2 text-background transition-all duration-300 hover:-translate-y-0.5 hover:text-gold"
              >
                <FiFacebook className="icon " />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="rounded-full bg-cream/15 p-2 text-background transition-all duration-300 hover:-translate-y-0.5 hover:text-gold"
              >
                <PiInstagramLogo className="icon" />
              </Link>
              <Link
                href="#"
                aria-label="Twitter (X)"
                className="rounded-full bg-cream/15 p-2 text-background transition-all duration-300 hover:-translate-y-0.5 hover:text-gold"
              >
                <RiTwitterXLine className="icon" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-background title-four font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2 ul-link-hover ">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="/our-story">Our Story</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-background font-semibold title-four">
              Support
            </h4>
            <ul className="space-y-2 ul-link-hover">
              <li>
                <Link href="#">FAQ</Link>
              </li>
              <li>
                <Link href="#">Shipping Info</Link>
              </li>
              <li>
                <Link href="#">Returns</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-background font-semibold title-four">
              Contact Us
            </h4>

            <ul className="footer-contact-ul ul-link-hover">
              <li>
                <span>
                  <MapPin className="icon2" />
                </span>{" "}
                Somanya, Ghana
              </li>
              <li>
                <span>
                  <Phone className="icon2" />
                </span>{" "}
                <Link href="tel:+233123456789">+233 123 456 789</Link>
              </li>
              <li>
                <span>
                  <Mail className="icon2" />
                </span>{" "}
                <Link href="mailto:info@honeymanghana.com">
                  info@honeymanghana.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-cream/20" />

        <div className="grid grid-cols-1 md:grid-cols-2 text-cream/50 gap-y-4 gap-x-12">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <Link
              className="hover:text-gold transition-colors"
              href="https://websendor.com"
            >
              Websendor
            </Link>
            . All rights reserved.
          </p>
          <div className="flex items-center flex-wrap justify-center md:justify-start gap-6">
            <Link
              className=" hover:text-gold/90 transition-colors duration-300"
              href="#"
            >
              Privacy Policy
            </Link>
            <Link
              className=" hover:text-gold/90 transition-colors duration-300"
              href="#"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
