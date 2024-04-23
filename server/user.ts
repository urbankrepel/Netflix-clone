"use server";

import prisma from "@/app/utils/db";
import { stripeInstance } from "@/app/utils/stripe";

export async function getUserStripeCustomerId(userEmail: string) {
  if (!userEmail) {
    throw new Error("User not found");
  }
  const user = await prisma.user.findFirst({
    where: { email: userEmail },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const stripeCustomerId = user.stripeCostumerId;

  if (!stripeCustomerId) {
    const customer = await stripeInstance?.customers.create({
      email: user.email!,
      name: user.name || "",
    });

    if (!customer) {
      throw new Error("Failed to create customer");
    }
    await prisma.user.update({
      where: { email: userEmail },
      data: { stripeCostumerId: customer.id },
    });
    return customer.id;
  }

  return stripeCustomerId;
}

export async function isSubscribed(userEmail: string): Promise<boolean> {
  const subscription = await prisma.userSubscription.findFirst({
    where: {
      User: {
        email: userEmail,
      },
      status: "active",
    },
  });

  if (!subscription) {
    return false;
  }

  if (
    subscription.status === "active" &&
    subscription.startDate < new Date() &&
    subscription.endDate > new Date()
  ) {
    return true;
  }

  return false;
}

export async function getCurrentSubscription(userEmail: string) {
  const subscription = await prisma.userSubscription.findFirst({
    where: {
      User: {
        email: userEmail,
      },
      status: "active",
    },
  });

  if (!subscription) {
    return null;
  }

  return subscription;
}
