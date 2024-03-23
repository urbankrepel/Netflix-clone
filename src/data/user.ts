import prisma from "@/lib/db";
import { UserProfile } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return await prisma.user.create({
    data,
  });
};

export const getUserProfiles = async (
  userId?: string
): Promise<UserProfile[] | null> => {
  if (!userId) {
    return null;
  }
  return await prisma.userProfile.findMany({
    where: {
      userId,
    },
  });
};
