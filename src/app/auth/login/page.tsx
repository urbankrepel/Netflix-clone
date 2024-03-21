"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { LoginSchema } from "@/schemas";
import Input from "@/components/Input";
import { login } from "@/actions/user";
import Button from "@/components/button";

type FormData = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: FormData) => {
    clearErrors();
    try {
      const res: any = await login(data);
      if (res.error) {
        setError("root", {
          type: "manual",
          message: res.error,
        });
      }
    } catch (e) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-white text-4xl mb-8 font-semibold">Sign in</h2>
      <div className="flex flex-col gap-4">
        <Input
          id="email"
          type="email"
          label="Email address"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          {...register("password")}
          error={errors.password?.message}
        />
      </div>
      {errors.root && (
        <p className="text-red-500 text-sm mt-1">{errors.root.message}</p>
      )}
      <Button type="submit">Sign up</Button>
      <p className="text-neutral-500 mt-12">
        Don&apos;t have an account?
        <span
          className="text-white ml-1 hover:underline cursor-pointer"
          onClick={() => router.push("/auth/register")}
        >
          Create an account
        </span>
        .
      </p>
    </form>
  );
};

export default LoginPage;
