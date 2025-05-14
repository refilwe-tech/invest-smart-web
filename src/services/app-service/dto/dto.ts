import { User, UserFinances } from "../models/models";

export const profileDto = (user: User) => ({
  last_name: user?.lastName,
  first_name: user?.firstName,
  phone_number: user?.phoneNumber,
  email: user?.email,
  password: user.password,
  id_number: user?.idNumber,
});

export const newUserFinancialDto = (user: UserFinances) => ({
  monthly_expenses: user?.monthlyExpenses,
  investment_goal: user?.goalId ?? "",
  gross_salary: user?.grossSalary,
  net_salary: user?.netSalary,
  current_savings: user?.currentSavings,
  user_id: user?.userId,
});

export const userFinancialDto = (user: UserFinances) => ({
  monthly_expenses: user?.monthlyExpenses,
  goal_id: user?.goalId ?? "",
  gross_salary: user?.grossSalary,
  net_salary: user?.netSalary,
  current_savings: user?.currentSavings,
  user_id: user?.userId,
  profile_id: user?.profileId,
});
