import prisma from "@/app/utils/db";

export async function getUserStripeCustomerId(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error("User not found");
  }

  return user.stripeCustomerId;
}