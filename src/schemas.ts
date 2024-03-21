import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email",
    })
    .email("Invalid email"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Invalid password",
    })
    .min(8, "Password must be at least 8 characters"),
});

export const RegisterSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Invalid name",
      })
      .min(1, "Name must be at least 1 character"),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Invalid email",
      })
      .email("Invalid email"),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Invalid password",
      })
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
        invalid_type_error: "Invalid confirm password",
      })
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
