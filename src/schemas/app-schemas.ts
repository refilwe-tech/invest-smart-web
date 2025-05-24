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
  phoneNumber: commonSchema.shape.phoneNumber,
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
  monthlyContribution: z.number().min(0),
  riskTolerance: z.enum(["low", "medium", "high"]),
});

export const FinancesSchema = z
  .object({
    grossSalary: z
      .number({ invalid_type_error: "Gross salary must be a number" })
      .min(0, "Gross salary must be a positive number"),
    totalDeductions: z
      .number({
        required_error: "Total deductions is required",
        invalid_type_error: "Total deductions must be a number",
      })
      .min(0, "Total deductions must be a positive number"),
    monthlyExpenses: z
      .number({ invalid_type_error: "Monthly expenses must be a number" })
      .min(0, "Monthly expenses must be a positive number"),
    netSalary: z.number().min(0, "Net salary must be a positive number"),
    currentSavings: z
      .number({ invalid_type_error: "Current savings must be a number" })
      .min(0, "Current savings must be a positive number"),
    goalId: z.number().optional(),
    userId: z.number(),
    profileId: z.number().optional(),
  })
  .refine(({ grossSalary, monthlyExpenses }) => grossSalary > monthlyExpenses, {
    path: ["monthlyExpenses"],
    message: "Gross salary must be greater than monthly expenses",
  })
  .refine(({ grossSalary, netSalary }) => grossSalary >= netSalary, {
    path: ["netSalary"],
    message: "Gross salary must be greater than net salary",
  })
  .refine(({ netSalary, monthlyExpenses }) => netSalary > monthlyExpenses, {
    path: ["monthlyExpenses"],
    message: "Net salary must be greater than monthly expenses",
  })
  .refine(
    ({ grossSalary, totalDeductions }) => grossSalary > totalDeductions,
    {
      path: ["totalDeductions"],
      message: "Total Deductions must be less than gross salary",
    }
  );

export const userSchema = z
  .object({
    id: z.string(),
    isActive: z.boolean(),
    userRole: z.string(),
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
