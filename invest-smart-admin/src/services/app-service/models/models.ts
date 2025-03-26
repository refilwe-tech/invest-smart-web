export type CountsData = {
  total_investment: number;
  total_users: number;
};
export const countsModel = (data: CountsData) => ({
  totalInvestments: data?.total_investment ?? 0,
  totalUsers: data?.total_users ?? 0,
});
