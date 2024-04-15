"use server";

import prisma from "@/app/utils/db";
import { stripeInstance } from "@/app/utils/stripe";
import { getUserStripeCustomerId } from "./user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function subscribeToProduct(productId: string) {
  const product = await prisma.product.findFirst({ where: { id: productId } });

  if (!product) {
    throw new Error("Product not found");
  }

  const stripeProductID = product.stripeId;

  if (!stripeProductID) {
    throw new Error("Product not found in Stripe");
  }

  const session = await getServerSession();
  const userEmail = session!.user?.email;

  console.log("session", session);

  const customerID = await getUserStripeCustomerId(userEmail!);

  const checkoutSession = await stripeInstance?.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: stripeProductID,
        quantity: 1,
      },
    ],
    customer: customerID,
    success_url: `${process.env.NEXTAUTH_URL}/api/stripe/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
  });

  if (!checkoutSession) {
    throw new Error("Failed to create subscription");
  }

  redirect(checkoutSession.url as string);
}