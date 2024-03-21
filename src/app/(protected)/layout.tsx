import { auth } from "@/auth";
import Navbar from "@/components/browse/Navbar";
import { SessionProvider } from "next-auth/react";

export default async function BrowseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <Navbar>{children}</Navbar>
    </SessionProvider>
  );
}
