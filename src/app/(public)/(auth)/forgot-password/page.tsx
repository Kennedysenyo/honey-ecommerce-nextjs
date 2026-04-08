"use client";

import { ArrowLeft, Loader, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { useActionState, useEffect, useRef, useState } from "react";
import { ForgotPasswordFormReturnType } from "@/features/auth/auth.types";
import { validateForgotPasswordForm } from "@/features/auth/auth.service";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const router = useRouter();

  const initialState: ForgotPasswordFormReturnType = {
    errors: {},
    success: false,
    errorMessage: null,
  };

  const [state, formAction, isPending] = useActionState(
    validateForgotPasswordForm,
    initialState,
  );

  const prevSuccess = useRef(false);

  useEffect(() => {
    if (!prevSuccess.current && state.success) {
      setEmail("");
      router.push("/verify-email");
    }

    prevSuccess.current = state.success;
  }, [state.success, router]);
  return (
    <div className="flex-1 min-h-[1000px] bg-amber/10 relative">
      <div className="absolute inset-0 ">
        <img
          className="w-full h-full object-cover"
          src="/assets/images/sign-in.jpg"
        />
      </div>
      <div className=" absolute inset-0 bg-black/35">
        <div className="absolute inset-0 z-10 w-full h-full section-py-one">
          <div className="section-max-w mx-auto section-px-one h-full flex flex-col gap-4 justify-center ">
            <div className="space-y-8 w-full">
              <div className="max-w-md mx-auto">
                <Link
                  href="/sign-in"
                  type="button"
                  className="flex items-center gap-4 text-background cursor-pointer hover:-translate-x-1 hover:text-gold transition-all duration-300"
                >
                  <ArrowLeft className="icon2" />
                  Back to Sign
                </Link>
              </div>
              <div className="space-y-4 text-center">
                <h1 className="font-heading title-one text-background">
                  Forgot Password?
                </h1>

                <p className="text-background subtitle-two max-w-sm text-center mx-auto">
                  No worries! Enter your email and we'll send you reset
                  instructions
                </p>
              </div>

              <div className="bg-background p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto space-y-6 ">
                {state.errorMessage && (
                  <p className="text-red-400 text-center">
                    {state.errorMessage}erereere
                  </p>
                )}
                <form action={formAction} className="space-y-4">
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
                        autoComplete="username"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="pl-10 py-2 pr-4 w-full border  border-gray-200 leading-8 rounded-lg outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                    {state.errors.email && (
                      <span className="text-xs text-red-400">
                        {state.errors.email}
                      </span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05, background: "#c46b00" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    aria-disabled={isPending}
                    className="block flex items-center justify-center bg-gold text-base font-semibold text-cream cursor-pointer w-full px-6 py-3 rounded-lg"
                  >
                    {isPending ? (
                      <span className="animate-spin">
                        <Loader className="icon3" />
                      </span>
                    ) : (
                      "Verify"
                    )}
                  </motion.button>
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
