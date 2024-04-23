import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import { isSubscribed } from "@/server/user";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();
  const subscribed = await isSubscribed(session?.user?.email!);
  if (!subscribed) {
    return (
      <div className="flex flex-col items-center justify-center m-4 h-screen gap-8">
        <h1 className="text-4xl font-bold">You are not subscribed</h1>
        <p className="text-lg">Please subscribe to access the content</p>
        <Link href="/subscription" className="text-red-500 underline">
          Subscribe now
        </Link>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <main className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
        {children}
      </main>
    </>
  );
}
