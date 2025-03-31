export type CountsData = {
  total_investments: number;
  total_users: number;
};
export const countsModel = (data: CountsData) => ({
  totalInvestments: data?.total_investments ?? 0,
  totalUsers: data?.total_users ?? 0,
});
