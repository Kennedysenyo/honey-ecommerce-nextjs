import { authClient } from "@/lib/better-auth/auth-client";
import { HeaderContent } from "./HeaderContent";
import { hasSession } from "@/lib/better-auth/auth";

export const Header = async () => {
  // const { data } = await authClient.getSession();
  // console.log(data);
  // const hasSeesion = !!data?.user;

  const isSignedIn = await hasSession();
  return <HeaderContent hasSession={isSignedIn} />;
};
