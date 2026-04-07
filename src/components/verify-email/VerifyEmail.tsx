"use client";
import { validateOTPForm } from "@/features/auth/auth.service";
import { VerifyEmailFormReturnType } from "@/features/auth/auth.types";
import { ArrowLeft, Loader } from "lucide-react";
import { motion } from "motion/react";
import { useActionState, useRef, useState, useEffect } from "react";

import "dotenv/config";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  email: string;
  codeExpiresIn: number;
}

export const VerifyEmail = ({ email, codeExpiresIn }: Props) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState(codeExpiresIn);

  const router = useRouter();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();

        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }

    if (e.key === "ArrowRight" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(pasted)) return;

    const newOtp = Array(otp.length).fill("");
    pasted
      .slice(0, otp.length)
      .split("")
      .forEach((char, i) => {
        newOtp[i] = char;
      });

    setOtp(newOtp);

    const lastIndex = Math.min(pasted.length, otp.length) - 1;
    inputRefs.current[lastIndex + 1]?.focus();
  };

  const inputElements = otp.map((digit, index) => (
    <input
      key={index}
      ref={(el) => {
        inputRefs.current[index] = el;
      }}
      type="text"
      inputMode="numeric"
      autoComplete="one-time-code"
      pattern="\d*"
      maxLength={1}
      value={digit}
      onFocus={(e) => e.target.select()}
      onChange={(e) => handleChange(index, e.target.value)}
      onKeyDown={(e) => handleKeyDown(index, e)}
      onPaste={handlePaste}
      className="w-12 h-14 sm:w-14 sm:h-16 text-center text-foreground text-2xl font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all  outline-none"
    />
  ));

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timer]);

  const handleResend = () => {
    setTimer(codeExpiresIn);
    setOtp(Array(6).fill(""));
  };

  const initialState: VerifyEmailFormReturnType = {
    errors: {},
    success: false,
    errorMessage: null,
  };

  const [state, formAction, isPending] = useActionState(
    validateOTPForm.bind(null, email),
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      setOtp(Array(6).fill(""));

      router.replace("/");
    }
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
                  Back to Sign in
                </Link>
              </div>
              <div className="space-y-4 text-center">
                <h1 className="font-heading title-one text-background">
                  Verify Your Email
                </h1>
                <div>
                  <p className="text-background subtitle-two">
                    Enter the 6-digit code we sent to
                  </p>
                  <p className="text-cream">{email}</p>
                </div>
              </div>

              <div className="bg-background p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto space-y-6 ">
                <form action={formAction} className="space-y-4">
                  <div className="flex justify-center items-center gap-2">
                    {inputElements}
                  </div>
                  <input name="otp" defaultValue={otp.join("")} hidden />

                  {timer > 0 ? (
                    <div className="text-center">
                      <p>
                        Code expires in{" "}
                        <span className="text-gold font-semibold">
                          {Math.floor(timer / 60)} :{" "}
                          {String(timer % 60).padStart(2, "0")}{" "}
                        </span>
                        mins.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span>
                        Didn't receive the code?{" "}
                        <button
                          type="button"
                          className="text-gold cursor-pointer"
                        >
                          Resend
                        </button>
                      </span>
                    </div>
                  )}
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
                  <p className="text-xs text-center">
                    Check your spam folder if you don't see the email
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
};
