"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";

import Input from "@/components/Input";
import { register as userRegistration } from "@/actions/user";
import { RegisterSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/button";

type FormData = z.infer<typeof RegisterSchema>;

const RegisterPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: FormData) => {
    clearErrors();
    const res: any = userRegistration(data);
    if (res.error) {
      setError("root", {
        type: "manual",
        message: res.error,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-white text-4xl mb-8 font-semibold">Sign up</h2>
      <div className="flex flex-col gap-4">
        <Input
          id="name"
          label="Full name"
          type="text"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          id="email"
          label="Email address"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Input
          id="confirmPassword"
          label="Confirm password"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>
      {errors.root && (
        <p className="text-red-500 text-sm mt-1">{errors.root.message}</p>
      )}
      <Button type="submit">Sign up</Button>
      <p className="text-neutral-500 mt-12">
        Already have an account?
        <span
          className="text-white ml-1 hover:underline cursor-pointer"
          onClick={() => router.push("/auth/login")}
        >
          Sign in
        </span>
        .
      </p>
    </form>
  );
};

export default RegisterPage;
