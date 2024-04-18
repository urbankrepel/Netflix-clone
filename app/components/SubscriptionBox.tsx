"use client";

import { cancelSubscription, subscribeToProduct } from "@/server/subscription";
import { Product } from "@prisma/client";
import React from "react";

interface SubscriptionBoxProps {
  product: Product;
  subscribed: boolean;
}

const SubscriptionBox: React.FC<SubscriptionBoxProps> = ({
  product,
  subscribed,
}) => {
  const subscribe = (productId: string) => {
    subscribeToProduct(productId);
  };

  const cancel = () => {
    cancelSubscription();
  };

  return (
    <div className="flex flex-col gap-2 border p-2 rounded-md shadow-md">
      <p className="text-xl font-bold">{product.name}</p>
      <p className="text-sm">{product.description}</p>
      {!subscribed && (
        <button
          className="bg-red-500 text-white p-2 rounded-md"
          onClick={() => subscribe(product.id)}
        >
          Subscribe for {product.price / 100}€/month
        </button>
      )}
      {subscribed && (
        <button
          className="bg-white text-red-500 p-2 rounded-md"
          onClick={cancel}
        >
          Current plan
        </button>
      )}
    </div>
  );
};

export default SubscriptionBox;
