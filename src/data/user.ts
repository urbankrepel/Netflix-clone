import prisma from "@/lib/db";

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
