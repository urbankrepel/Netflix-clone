import { Suspense } from "react";
import SubscriptionBox from "../components/SubscriptionBox";
import prisma from "../utils/db";
import { getCurrentSubscription } from "@/server/user";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function SubscriptionPage() {
  const session = await getServerSession();
  const subscriptions = await prisma.product.findMany({
    orderBy: {
      price: "asc",
    },
  });
  const currentSubscription = await getCurrentSubscription(
    session?.user?.email!
  );
  return (
    <div className="flex flex-col items-center justify-center m-4 h-screen gap-8">
      <h1 className="text-4xl font-bold">Subscriptions</h1>
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-4">
        <Suspense fallback={<div>Loading...</div>}>
          {subscriptions.map((product) => (
            <SubscriptionBox
              key={product.id}
              product={product}
              subscribed={currentSubscription?.productId === product.id}
            />
          ))}
        </Suspense>
      </div>
      <Link href="/home" className="text-red-500 underline">
        Go home
      </Link>
    </div>
  );
}
