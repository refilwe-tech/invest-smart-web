import { newUserFinancialDto, userFinancialDto } from "./dto/dto";
import type { UserFinances } from "./models/models";
import { authNetService } from "../network-service";

const baseUrl = "/finances";

const FinancesUrls = {
  finances: baseUrl,
  goals: `${baseUrl}/goals`,
  userFinances: (id: string) => `${baseUrl}/${id}`,
  userFinancialProfile: (id: string) => `${baseUrl}/profile/${id}`,
  userFinancialGraph: (id: string) => `${baseUrl}/${id}/data`,
};

const createFinancialProfile = async (user: UserFinances) => {
  const dto = newUserFinancialDto(user);
  return authNetService
    .post(FinancesUrls.finances, dto)
    .then((response) => response.data);
};

const updateFinancialProfile = async (user: UserFinances) => {
  const dto = userFinancialDto(user);
  return authNetService
    .put(FinancesUrls.userFinances(user?.userId.toString() ?? ""), dto)
    .then((response) => response.data);
};

const getUserFinancialProfile = async (id: string) => {
  return authNetService
    .get(`${FinancesUrls.finances}/${id}`)
    .then((response) => response.data);
};

const getFinancialGraph = async (id: string) => {
  return authNetService
    .get(FinancesUrls.userFinancialGraph(id))
    .then((response) => response.data);
};

const getInvestmentGoals = async () =>
  authNetService.get(FinancesUrls.goals).then((response) => response.data);

export default {
  getFinancialGraph,
  getInvestmentGoals,
  createFinancialProfile,
  updateFinancialProfile,
  getUserFinancialProfile,
};
