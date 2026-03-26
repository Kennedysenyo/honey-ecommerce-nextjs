import { LocateIcon, Mail, MapPin, Phone } from "lucide-react";
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
                className="p-2 rounded-full bg-cream/15 text-background hover:text-gold transition-color duration-300"
              >
                <FiFacebook className="icon " />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-cream/15 text-background hover:text-gold transition-color duration-300"
              >
                <PiInstagramLogo className="icon" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-cream/15 text-background hover:text-gold transition-color duration-300"
              >
                <RiTwitterXLine className="icon" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-background title-four">Quick Links</h3>
            <ul className="space-y-2 ul-link-hover ">
              <li>
                <Link href="#">Home</Link>
              </li>
              <li>
                <Link href="#">Shop</Link>
              </li>
              <li>
                <Link href="#">Our Story</Link>
              </li>
              <li>
                <Link href="#">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-background font-semibold title-four">
              Support
            </h3>
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
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-background title-four">Contact Us</h3>

            <ul className="footer-contact-ul">
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
                +233 123 456 789
              </li>
              <li>
                <span>
                  <Mail className="icon2" />
                </span>{" "}
                info@honeymanghana.com
              </li>
            </ul>
          </div>
        </div>
        <hr className="text-cream/20" />
        <div className="grid grid-cols-1 md:grid-cols-2 text-cream/50 gap-4">
          <p>
            © {new Date().getFullYear()} Honey Man Ghana. All rights reserved.
          </p>
          <div className="flex items-center flex-wrap ">
            <Link
              className="mr-auto hover:text-gold/90 transition-color duration-300"
              href="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="mr-auto hover:text-gold/90 transition-color duration-300"
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
