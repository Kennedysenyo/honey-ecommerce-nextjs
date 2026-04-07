"use client";

import { Eye, EyeOff, Loader, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import {
  ChangeEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react";
import {
  SignUpFormReturnType,
  UserSignUpDataType,
} from "@/features/auth/auth.types";
import { validateSignUpForm } from "@/features/auth/auth.service";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [revealPassword, setRevealPassword] = useState(false);
  const [revealCnfrmPassword, setRevealCnfrmPassword] = useState(false);

  const [formData, setFormData] = useState<UserSignUpDataType>({
    name: "",
    email: "",
    password: "",
    cnfrmPassword: "",
    agreeToTerms: false,
  });

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const initialState: SignUpFormReturnType = {
    errors: {},
    success: false,
    errorMessage: null,
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "aggreeToTerms" ? checked : value,
    }));
  };

  const [state, formAction, isPending] = useActionState(
    validateSignUpForm,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      setFormData({
        name: "",
        email: "",
        password: "",
        cnfrmPassword: "",
        agreeToTerms: false,
      });
      router.push("/verify-email");
    }
  }, [state.success, router]);

  return (
    <div className="flex-1 min-h-[1250px] bg-amber/10 relative">
      <div className="absolute inset-0 ">
        <img
          className="w-full h-full object-cover"
          src="/assets/images/sign-up.jpg"
        />
      </div>
      <div className=" absolute inset-0 bg-black/35">
        <div className="absolute inset-0 z-10 w-full h-full section-py-one">
          <div className="section-max-w mx-auto section-px-one h-full flex flex-col justify-center gap-4 ">
            <div className="space-y-8 w-full">
              <div className="space-y-4 text-center">
                <h1 className="font-heading title-one text-background">
                  Join Us
                </h1>
                <p className="text-background subtitle-two">
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

                {state.errorMessage && (
                  <p className="min-h-4 p-1 text-xs text-red-600">
                    {state.errorMessage}
                  </p>
                )}

                <form action={formAction} className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-semibold leading-8">
                      Full Name
                    </label>
                    <div className="relative ">
                      <User className="icon3 absolute top-4 left-3 text-gray-600/70" />
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        onChange={handleChange}
                        value={formData.name}
                        className="pl-10 py-2 pr-4 w-full border border-gray-200 leading-8 rounded-lg outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                    {state.errors.name && (
                      <span className="text-xs text-red-400">
                        {state.errors.name}
                      </span>
                    )}
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
                        autoComplete="username"
                        onChange={handleChange}
                        value={formData.email}
                        className="pl-10 py-2 pr-4 w-full border  border-gray-200 leading-8 rounded-lg outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                    {state.errors.email && (
                      <span className="text-xs text-red-400">
                        {state.errors.email}
                      </span>
                    )}
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
                        type={revealPassword ? "text" : "password"}
                        name="password"
                        autoComplete="new-password"
                        onChange={handleChange}
                        value={formData.password}
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
                    {state.errors.password && (
                      <span className="text-xs text-red-400">
                        {state.errors.password}
                      </span>
                    )}
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
                        type={revealCnfrmPassword ? "text" : "password"}
                        name="cnfrmPassword"
                        autoComplete="new-password"
                        onChange={handleChange}
                        value={formData.cnfrmPassword}
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
                    {state.errors.cnfrmPassword && (
                      <span className="text-xs text-red-400">
                        {state.errors.cnfrmPassword}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 ">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        value={formData.agreeToTerms ? "true" : undefined}
                        onChange={handleChange}
                        className={`w-4 h-4 border-2 rounded-sm
  ${state.errors.agreeToTerms ? "border-red-400" : "border-[#c46b00]"}`}
                      />
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
                    {state.errors.agreeToTerms && (
                      <p className="text-red-500 text-xs">
                        {state.errors.agreeToTerms}
                      </p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#c46b00" }}
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
                      "Sign Up"
                    )}
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
