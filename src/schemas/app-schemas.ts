import { z } from "zod";
import { commonSchema } from "./common-schemas";

export const ProfileSchema = z.object({
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
  email: commonSchema.shape.email,
  age: z
    .number()
    .min(18, { message: "You must be at least 18 years old" })
    .max(120, { message: "Age must be less than 120" })
    .optional(),
  userRole: z.enum(["admin", "user"]),
  phoneNumber: commonSchema.shape.phoneNumber
});

export const InvestmentSchema = z.object({
  amount: z
    .number()
    .min(100, "Minimum investment is R100")
    .max(10000000, "Maximum investment is R10,000,000"),
  durationMonths: z
    .number()
    .min(1, "Minimum duration is 1 month")
    .max(360, "Maximum duration is 30 years"),
  monthlyContribution: z.number().min(0).optional(),
  riskTolerance: z.enum(["low", "medium", "high"]).optional(),
});

export const FinancesSchema = z.object({
  grossSalary: z.number().min(0, "Gross salary must be a positive number"),
  monthlyExpenses: z
    .number()
    .min(0, "Monthly expenses must be a positive number"),
  netSalary: z.number().min(0, "Net salary must be a positive number"),
  currentSavings: z
    .number()
    .min(0, "Current savings must be a positive number"),
  goalId: z.number().optional(),
  userId: z.number(),
  profileId: z.number().optional(),
});

export const userSchema = z
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
    idNumber: commonSchema.shape.idNumber.optional(),
    email: z.string().email().nonempty({ message: "Email is required" }),
    password: commonSchema.shape.password.optional(),
    confirmPassword: z.string().nonempty({
      message: "Confirm password is required",
    }).optional(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
