import { z } from "zod";
import { isIdNumberValid } from "@project/helpers";
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
    idNumber: z
      .string()
      .min(13, "ID number must be exactly 13 characters")
      .max(13, "ID number must be exactly 13 characters")
      .nonempty({
        message: "ID number is required",
      })
      .regex(/^\d+$/, "ID number must contain only digits")
      .refine(
        (val) => {
          if (!isIdNumberValid(val)) {
            return false;
          }
          return true;
        },
        { message: "Invalid South African ID number" }
      ),
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