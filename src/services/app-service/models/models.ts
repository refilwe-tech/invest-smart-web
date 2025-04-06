export type CountsData = {
  total_investments: number;
  total_users: number;
};

export type UserApi = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  user_role: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
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
}: UserApi):User => ({
  id: data?.user_id ?? "",
  userRole: user_role ?? "",
  firstName: first_name ?? "",
  lastName: last_name ?? "",
  phoneNumber: phone_number ?? "",
  createdAt: created_at ?? "",
  updatedAt: updated_at ?? "",
  isActive: is_active ?? false,
  ...data,
});
