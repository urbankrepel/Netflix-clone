import prisma from "@/app/utils/db";
import { stripeInstance } from "@/app/utils/stripe";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return redirect("/home");
  }

  const session = await stripeInstance?.checkout.sessions.retrieve(sessionId);

  if (!session) {
    return redirect("/home");
  }

  if (session.payment_status !== "paid") {
    return redirect("/home");
  }

  const subscriptionId = session.subscription as string | undefined;

  if (!subscriptionId) {
    return redirect("/home");
  }

  const subscription = await stripeInstance?.subscriptions.retrieve(
    subscriptionId!
  );

  if (!subscription) {
    return redirect("/home");
  }

  const priceId = subscription.items.data[0].price.id as string | undefined;

  if (!priceId) {
    return redirect("/home");
  }
  console.log("priceId", priceId);
  const product = await prisma.product.findFirst({
    where: { stripeId: priceId },
  });
  if (!product) {
    return redirect("/home");
  }

  const oldSubscription = await prisma.userSubscription.findFirst({
    where: {
      OR: [
        {
          stripeSubscriptionId: {
            equals: subscription.id,
          },
        },
        {
          userId: {
            equals: subscription.customer as string,
          },
        },
      ],
    },
  });

  if (oldSubscription) {
    return redirect("/home");
  }

  const user = await prisma.user.findFirst({
    where: {
      stripeCostumerId: subscription.customer as string,
    },
  });

  if (!user) {
    return redirect("/home");
  }

  await prisma.userSubscription.create({
    data: {
      startDate: new Date(subscription.current_period_start * 1000),
      endDate: new Date(subscription.current_period_end * 1000),
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
      Product: {
        connect: {
          id: product.id,
        },
      },
      User: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  return NextResponse.json({
    subscription,
  });
}
