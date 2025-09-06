import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log("session", session);
  return <>Hello {session?.user.email}</>;
}
