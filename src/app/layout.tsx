import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NextAuthProvider from "../providers/NextAuthProvider";
import { LoadingProvider } from "@/providers/LoadingProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F9F8F9] ">
        <NextAuthProvider session={nextAuthSession}>
          <LoadingProvider>{children}</LoadingProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
