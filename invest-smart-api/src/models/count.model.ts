import { getInvestmentsModel } from "./investment.model";
import { getUsersModel } from "./user.model";

export const getCountsModel = async ()=>{
  const {users} = await getUsersModel();
  const {investments} = await getInvestmentsModel()
  console.log(investments)
  return {
    total_users: users?.length ?? 0,
    total_investments: investments?.length ?? 0
  }
}