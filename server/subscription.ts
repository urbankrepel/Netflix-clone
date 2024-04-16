"use server";

import prisma from "@/app/utils/db";
import { stripeInstance } from "@/app/utils/stripe";

export async function subscribeToProduct(productId: string) {
  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) {
    throw new Error("Product not found");
  }

  const stripeProductID = product.stripeId;

  if (!stripeProductID) {
    throw new Error("Product not found in Stripe");
  }

  // Create a new subscription

  const subscription = await stripeInstance?.subscriptions.create({
    
}
