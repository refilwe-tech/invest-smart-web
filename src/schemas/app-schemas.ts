import { z } from "zod";

export const ProfileSchema = z
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
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .nonempty({ message: "Email is required" }),
    age: z
      .number()
      .min(18, { message: "You must be at least 18 years old" })
      .max(120, { message: "Age must be less than 120" })
      .optional(),
      userRole: z.enum(["admin", "user"]),
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, "Phone number must be 10 digits")
      .regex(/^0\d{9}$/, "Phone number must start with 0")
      .nonempty({ message: "Phone number is required" }),
  });