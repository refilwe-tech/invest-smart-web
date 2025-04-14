import { User, UserFinances } from "../models/models";

export const profileDto = (user: User) => ({
  last_name: user?.lastName,
  first_name: user?.firstName,
  phone_number: user?.phoneNumber,
  email: user?.email,
  age: user.age,
});

export const newUserFinancialDto = (user: UserFinances) => ({
  monthly_expenses: user?.monthlyExpenses,
  investment_goal: user?.investmentGoal ?? "",
  gross_salary: user?.grossSalary,
  net_salary: user?.netSalary,
  current_savings: user?.currentSavings,
  user_id: user?.userId,
});

export const userFinancialDto = (user: UserFinances) => ({
  monthly_expenses: user?.monthlyExpenses,
  investment_goal: user?.investmentGoal ?? "",
  gross_salary: user?.grossSalary,
  net_salary: user?.netSalary,
  current_savings: user?.currentSavings,
  user_id: user?.userId,
  profile_id: user?.profileId,
});
