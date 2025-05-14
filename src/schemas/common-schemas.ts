import { isIdNumberValid } from "@project/helpers";
import { z } from "zod";

export const commonSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty({ message: "Email is required" }),
    password: z
    .string()
    .regex(/^(?=.*[a-z])/, "Password must contain lowercase letters")
    .regex(/^(?=.*[A-Z])/, "Password must contain uppercase letters")
    .regex(/^(?=.*\d)/, "Password must contain numbers")
    .regex(/^(?=.*[^a-zA-Z\d])/, "Password must have at least one @#$ symbol")
    .min(7, "Length must be greater than 7 characters")
    .max(16)
    .nonempty({ message: "Password is required" }),
    idNumber:z
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
          )
});