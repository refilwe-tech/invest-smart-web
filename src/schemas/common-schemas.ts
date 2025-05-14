import { isIdNumberValid } from "@project/helpers";
import { z } from "zod";

export const commonSchema = z.object({
  phoneNumber: z
    .string()
    .nonempty({ message: "Phone number is required" })
    .refine(
      (val) =>
        (/^0\d{9}$/.test(val) && val.length === 10) ||
        (/^\+27\d{9}$/.test(val) && val.length === 12),
      {
        message:
          "Phone number must be either 10 digits starting with 0 or 12 digits starting with +27",
      }
    ),
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
});