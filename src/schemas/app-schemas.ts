import { z } from "zod";

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
  investmentGoal: z
    .string()
    .min(3, "Investment goal must be at least 3 characters long")
    .max(100, "Investment goal must be at most 100 characters long")
    .optional(),
  userId: z.number(),
  profileId: z.number().optional(),
});
