export type CountsData = {
  total_investments: number;
  total_users: number;
  total_admins: number;
};

export type UserApi = {
  account_id: string;
  user_id?: string;
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

export type AdminAPI = UserApi & {
  admin_id: string;
};

export interface UserFinancesAPI {
  user_id: number;
  profile_id?: number;
  gross_salary: string;
  net_salary: string;
  current_savings: string;
  monthly_expenses: string;
  goal_id: number;
}

export interface UserFinances {
  userId: number;
  profileId?: number;
  grossSalary: number;
  netSalary: number;
  totalDeductions: number;
  currentSavings: number;
  monthlyExpenses: number;
  goalId?: number;
}

export type User = {
  id?: string;
  password?: string;
  idNumber?: string;
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
  totalAdmins: data?.total_admins ?? 0,
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
  id: data?.account_id ?? data?.user_id ?? "",
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
  goal_id,
  monthly_expenses,
  ...data
}: UserFinancesAPI): UserFinances => ({
  grossSalary: Number(gross_salary) ?? 0,
  netSalary: Number(net_salary) ?? 0,
  totalDeductions: Number(gross_salary) - Number(net_salary) || 0,
  monthlyExpenses: Number(monthly_expenses) ?? 0,
  goalId: goal_id ?? "",
  currentSavings: Number(data?.current_savings) ?? 0,
  userId: data?.user_id,
  profileId: data?.profile_id,
  ...data,
});

export interface InvestmentPlanRequest {
  unit: "years" | "months";
  amount: number;
  durationMonths: number;
  monthlyContribution?: number;
  riskTolerance?: "low" | "medium" | "high";
}

export interface SavedInvestmentPlan {
  planName: string;
  description?: string;
  items: {
    investment_id?: number;
    bank_account_id?: number;
    amount: number;
    expected_duration_months: number;
    notes?: string;
  }[];
}

export interface InvestmentPlanResponse {
  planName: string;
  description: string;
  items: {
    investment_id?: number;
    bank_account_id?: number;
    amount: number;
    expected_duration_months: number;
    expected_return: number;
    name: string;
    type: string;
    risk_level: string;
  }[];
  totalInvested: number;
  projectedValue: number;
  projectedGrowth: number;
  durationMonths: number;
  monthlyContribution?: number;
}

export interface UserInvestmentPlan {
  plan_id: number;
  plan_name: string;
  description?: string;
  created_at: string;
  items: {
    item_id: number;
    amount: number;
    expected_duration_months: number;
    notes?: string;
    name: string;
    type: string;
    risk_level: string;
    expected_return: number;
  }[];
  totalInvested: number;
}
