"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

import { LoginSchema, RegisterSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { createUser } from "@/data/user";

async function login(data: z.infer<typeof LoginSchema>) {
  const verify = LoginSchema.safeParse(data);
  if (!verify.success) {
    return {
      error: verify.error.errors,
      status: 400,
    };
  }

  const { email, password } = verify.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password", status: 400 };
        default:
          return { error: "An error occurred", status: 500 };
      }
    }
  }
}

async function register(data: z.infer<typeof RegisterSchema>) {
  const verify = RegisterSchema.safeParse(data);
  if (!verify.success) {
    return {
      error: verify.error.errors,
      status: 400,
    };
  }

  const { email, password, name } = verify.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await createUser({
      email,
      password: hashedPassword,
      name,
    });
  } catch (error) {
    return { error: "An error occurred", status: 500 };
  }

  redirect("/auth/login");
}

export { login, register };
