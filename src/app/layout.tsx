import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NextAuthProvider from "../providers/NextAuthProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <NextAuthProvider session={nextAuthSession}>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
