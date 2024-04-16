import { Suspense } from "react";
import SubscriptionBox from "../components/SubscriptionBox";
import prisma from "../utils/db";
import { Product } from "@prisma/client";

export default function SubscriptionPage() {
  const subscriptions = prisma.product.findMany();
  return (
    <div className="flex flex-col items-center justify-center m-4 h-screen gap-8">
      <h1 className="text-4xl font-bold">Subscriptions</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Subscriptions promise={subscriptions} />
      </Suspense>
    </div>
  );
}

async function Subscriptions({ promise }: { promise: Promise<Product[]> }) {
  const subscriptions = (await promise) as Product[];
  return (
    <div className="grid grid-cols-3 gap-4">
      {subscriptions.map((product) => (
        <SubscriptionBox key={product.id} product={product} />
      ))}
    </div>
  );
}
