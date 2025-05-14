import { z } from "zod";
import { commonSchema } from "./common-schemas";

export const LoginSchema = z.object({
  email: z.string().email().nonempty({ message: "Email is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

export const RegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z]+$/, "First name must contain only letters")
      .nonempty({ message: "First name is required" }),
    lastName: z
      .string()
      .regex(/^[a-zA-Z]+$/, "Last name must contain only letters")
      .min(3)
      .max(30)
      .nonempty({ message: "Last name is required" }),
    idNumber: commonSchema.shape.idNumber,
    email: z.string().email().nonempty({ message: "Email is required" }),
    password: commonSchema.shape.password,
    confirmPassword: z.string().nonempty({
      message: "Confirm password is required",
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });