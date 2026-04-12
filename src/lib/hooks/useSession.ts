"use client";

import { authClient } from "../better-auth/auth-client";

export const useSession = () => {
  const { data, isPending, error } = authClient.useSession();

  return {
    session: data,
    isLoading: isPending,
    error,
    isSignedIn: !!data?.user,
  };
};
