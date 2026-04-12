import { isSignedIn } from "@/lib/better-auth/server-auth";
import { HeaderContent } from "./HeaderContent";

export const Header = async () => {
  const s = await isSignedIn();
  return <HeaderContent hasSession={s} />;
};
