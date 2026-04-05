"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react";

export default function SignIn() {
  const [reveal, setReveal] = useState(false);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (passwordRef.current) {
      const originalType = passwordRef.current.type;
      if (reveal) {
        passwordRef.current.type = "text";
      } else {
        passwordRef.current.type = originalType;
      }
    }
  }, [reveal, passwordRef.current]);

  return (
    <div className="flex-1 min-h-[900px] bg-amber/10 relative">
      <div className="absolute inset-0 ">
        <img
          className="w-full h-full object-cover"
          src="/assets/images/sign-in.jpg"
        />
      </div>
      <div className=" absolute inset-0 bg-black/35">
        <div className="absolute inset-0 z-10 w-full h-full section-py-one">
          <div className="section-max-w mx-auto section-px-one h-full flex flex-col gap-4 justify-center ">
            <div className="space-y-12 w-full">
              <div className="space-y-4 text-center">
                <h1 className="font-heading title-one text-background">
                  Welcome Back
                </h1>
                <p className="text-background subtitle-one">
                  Sign in to your Honey Man account
                </p>
              </div>

              <div className="bg-background p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto space-y-6 ">
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
                    Or sign up with email
                  </span>
                  <hr className="border border-gray-200 flex-1" />
                </div>

                <form className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-semibold leading-8">
                      Email
                    </label>
                    <div className="relative ">
                      <Mail className="icon3 absolute top-4 left-3 text-gray-600/70" />
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="johndoe@email.com"
                        autoComplete="username"
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
                        autoComplete="current-password"
                        className="pl-10 py-2 pr-10 w-full border border-gray-200 leading-8 rounded-lg outline-none focus:ring-2 focus:ring-gold"
                      />
                      <button
                        type="button"
                        className="absolute top-4 right-3 text-gray-600/70"
                        onClick={() => setReveal((o) => !o)}
                      >
                        {reveal ? (
                          <Eye className="icon3" />
                        ) : (
                          <EyeOff className="icon3" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-base">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Remember Me
                    </label>

                    <Link
                      href="/forgot-password"
                      className="hover:text-gold transition-colors duration-300"
                    >
                      Forgot Password
                    </Link>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#c46b00" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="block text-center bg-gold text-base font-semibold text-cream cursor-pointer w-full px-6 py-3 rounded-lg"
                  >
                    Sign In
                  </motion.button>
                  <p className="text-center text-xs sm:text-base">
                    Don't have an account?
                    <Link
                      href="/sign-up"
                      className="text-gold hover:text-amber transition-colors duration-300"
                    >
                      {" "}
                      Sign Up
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
