"use client";

import { signOut } from "@/features/auth/auth.service";
import { Loader } from "lucide-react";

import { useTransition } from "react";

export const SignOutButton = () => {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await signOut();
    });
  };

  return (
    <button
      onClick={handleClick}
      className="w-full px-6 py-2 text-sm tex- text-red-400 bg-red-100 rounded-sm flex justify-center items-center cursor-pointer hover:bg-red-400 hover:text-background hover:text-semibold transition-all duration-300 "
    >
      {pending ? <Loader className="icon3 animate-spin" /> : "Sign out"}
    </button>
  );
};
