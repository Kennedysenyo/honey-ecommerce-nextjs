"use client";

import { Eye, EyeOff, Loader, Lock } from "lucide-react";

import { motion } from "motion/react";
import {
  ChangeEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  SetNewPasswordDataType,
  SetNewPasswordFormReturnType,
} from "@/features/auth/auth.types";
import { validateSetNewPasswordForm } from "@/features/auth/auth.service";
import { useRouter } from "next/navigation";

interface Props {
  email: string;
  otp: string;
}

export const SetNewPassword = ({ email, otp }: Props) => {
  const [revealPassword, setRevealPassword] = useState(false);
  const [revealCnfrmPassword, setRevealCnfrmPassword] = useState(false);
  const [formData, setFormData] = useState<
    Pick<SetNewPasswordDataType, "password" | "cnfrmPassword">
  >({
    password: "",
    cnfrmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((p) => ({ ...p, [name]: value }));
  };

  const initialState: SetNewPasswordFormReturnType = {
    errors: {},
    success: false,
    errorMessage: null,
  };

  const [state, formAction, isPending] = useActionState(
    validateSetNewPasswordForm.bind(null, { email, otp }),
    initialState,
  );
  useEffect(() => {
    if (state.success) {
      setFormData({
        password: "",
        cnfrmPassword: "",
      });

      router.replace("/sign-in");
    }
  }, [state.success, router, state.errorMessage]);

  useEffect(() => {
    if (!state.success && state.errorMessage?.toLowerCase().includes("otp")) {
      setErrorMessage("");
      router.replace("/forgot-password");
    } else {
      setErrorMessage(state.errorMessage);
    }
  }, [state.errorMessage, router]);

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
              <div className="space-y-4 text-center">
                <h1 className="font-heading title-one text-background">
                  Set New Password
                </h1>

                <p className="text-background subtitle-two max-w-sm text-center mx-auto">
                  Create a new password to secure your account.
                </p>
              </div>

              <div className="bg-background p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto space-y-6 ">
                {errorMessage && (
                  <p className="text-red-400 text-center">{errorMessage}</p>
                )}
                <form action={formAction} className="space-y-4">
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
};
