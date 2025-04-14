export type CountsData = {
  total_investments: number;
  total_users: number;
};

export type UserApi = {
  user_id: string;
  first_name: string;
  gross_salary?: string;
  net_salary?: string;
  age?: number;
  birth_date?: string;
  gender?: string;
  last_name: string;
  email: string;
  phone_number?: string;
  user_role: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
};

export interface UserFinancesAPI {
  user_id: string;
  profile_id?:string;
  gross_salary: string;
  net_salary: string;
  current_savings: string;
  monthly_expenses: string;
  investment_goal: string;
}

export interface UserFinances {
  userId: string;
  profileId?:string;
  grossSalary: string;
  netSalary: string;
  currentSavings: string;
  monthlyExpenses: string;
  investmentGoal: string;
}

export type User = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  grossSalary?: string;
  netSalary?: string;
  age?: number;
  gender?: string;
  birthDate?: string;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
  userRole: string;
};

export const countsModel = (data: CountsData) => ({
  totalInvestments: data?.total_investments ?? 0,
  totalUsers: data?.total_users ?? 0,
});

export const userModel = ({
  user_role,
  is_active,
  first_name,
  last_name,
  phone_number,
  created_at,
  updated_at,
  ...data
}: UserApi): User => ({
  id: data?.user_id ?? "",
  userRole: user_role ?? "",
  firstName: first_name ?? "",
  lastName: last_name ?? "",
  phoneNumber: phone_number ?? "",
  createdAt: created_at ?? "",
  updatedAt: updated_at ?? "",
  birthDate: data?.birth_date ?? "",
  isActive: is_active ?? false,
  grossSalary: data?.gross_salary ?? "R 0.00",
  netSalary: data?.net_salary ?? "R 0.00",
  ...data,
});

export const userProfileModel = ({
  gross_salary,
  net_salary,
  investment_goal,
  monthly_expenses,
  ...data
}: UserFinancesAPI): UserFinances => ({
  grossSalary: (gross_salary) ?? 0,
  netSalary: (net_salary) ?? 0,
  monthlyExpenses: (monthly_expenses)??0,
  investmentGoal: investment_goal??'',
  currentSavings: data?.current_savings??0,
  userId: data?.user_id,
  profileId: data?.profile_id,
  ...data,
});
