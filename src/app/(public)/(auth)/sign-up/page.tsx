"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react";

export default function SignUp() {
  const [revealPassword, setRevealPassword] = useState(false);
  const [revealCnfrmPassword, setRevealCnfrmPassword] = useState(false);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (passwordRef.current) {
      const originalType = passwordRef.current.type;
      if (revealPassword) {
        passwordRef.current.type = "text";
      } else {
        passwordRef.current.type = originalType;
      }
    }
  }, [revealPassword, passwordRef.current]);

  useEffect(() => {
    if (confirmPasswordRef.current) {
      const originalType = confirmPasswordRef.current.type;
      if (revealCnfrmPassword) {
        confirmPasswordRef.current.type = "text";
      } else {
        confirmPasswordRef.current.type = originalType;
      }
    }
  }, [revealCnfrmPassword, confirmPasswordRef.current]);
  return (
    <div className="flex-1 min-h-[1100px] bg-amber/10 relative">
      <div className="absolute inset-0 ">
        <img
          className="w-full h-full object-cover"
          src="/assets/images/sign-in.jpg"
        />
      </div>
      <div className=" absolute inset-0 bg-black/35">
        <div className="absolute inset-0 z-10 w-full h-full section-py-one">
          <div className="section-max-w mx-auto section-px-one h-full flex flex-col justify-center gap-4 ">
            <div className="space-y-12 w-full">
              <div className="space-y-4 text-center">
                <h1 className="font-heading title-one text-background">
                  Join Us
                </h1>
                <p className="text-background subtitle-one">
                  Create your account and discover premium organic honey
                </p>
              </div>

              <div className="bg-background p-8 rounded-2xl shadow-lg w-full max-w-lg mx-auto space-y-6 ">
                <div>
                  <button className="flex items-center gap-2 justify-center text-xs sm:text-base px-6 py-3 w-full border-2 border-gray-200 rounded-lg hover:border-gray-300 transtion-all duration-300 cursor-pointer">
                    <FcGoogle className="icon" />
                    <span className="text-xs sm:text-base md:text-lg">
                      Continue with Google
                    </span>
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <hr className="border border-gray-200  flex-1" />
                  <span className="shrink-0 text-center">
                    Or continue with email
                  </span>
                  <hr className="border border-gray-200 flex-1" />
                </div>

                <form className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-semibold leading-8">
                      Full Name
                    </label>
                    <div className="relative ">
                      <Mail className="icon3 absolute top-4 left-3 text-gray-600/70" />
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        className="pl-10 py-2 pr-4 w-full border border-gray-200 leading-8 rounded-lg outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-semibold leading-8">
                      Email Address
                    </label>
                    <div className="relative ">
                      <Mail className="icon3 absolute top-4 left-3 text-gray-600/70" />
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="johndoe@email.com"
                        className="pl-10 py-2 pr-4 w-full border  border-gray-200 leading-8 rounded-lg outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="password"
                      className="text-semibold leading-8"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="icon3 absolute top-4 left-3 text-gray-600/70" />
                      <input
                        ref={passwordRef}
                        id="password"
                        type="password"
                        name="password"
                        className="pl-10 py-2 pr-10 w-full border border-gray-200 leading-8 rounded-lg outline-none focus:ring-2 focus:ring-gold"
                      />
                      <button
                        type="button"
                        className="absolute top-4 right-3 text-gray-600/70"
                        onClick={() => setRevealPassword((o) => !o)}
                      >
                        {revealPassword ? (
                          <Eye className="icon3" />
                        ) : (
                          <EyeOff className="icon3" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="cnfrmPassword"
                      className="text-semibold leading-8"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="icon3 absolute top-4 left-3 text-gray-600/70" />
                      <input
                        ref={confirmPasswordRef}
                        id="cnfrmPassword"
                        type="password"
                        name="cnfrmPassword"
                        className="pl-10 py-2 pr-10 w-full border border-gray-200 leading-8 rounded-lg outline-none focus:ring-2 focus:ring-gold"
                      />
                      <button
                        type="button"
                        className="absolute top-4 right-3 text-gray-600/70"
                        onClick={() => setRevealCnfrmPassword((o) => !o)}
                      >
                        {revealCnfrmPassword ? (
                          <Eye className="icon3" />
                        ) : (
                          <EyeOff className="icon3" />
                        )}
                      </button>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 ">
                    <input type="checkbox" />
                    <span className="text-xs sm:text-base">
                      I agree to the{" "}
                      <Link href="/terms" className="text-gold">
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy-policy" className="text-gold">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#c46b00" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="block text-center bg-gold text-base font-semibold text-cream cursor-pointer w-full px-6 py-3 rounded-lg"
                  >
                    Sign Up
                  </motion.button>
                  <p className="text-center text-xs sm:text-base">
                    Already have an account?
                    <Link
                      href="/sign-in"
                      className="text-gold hover:text-amber transition-colors duration-300"
                    >
                      {" "}
                      Sign In
                    </Link>
                  </p>
                </form>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2  ">
              <span className="h-[2px] w-[70px] gradient-to-br"></span>
              <span className="text-cream text-xs">Premium Organic Honey</span>
              <span className="h-[2px] w-[70px] gradient-to-br"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
