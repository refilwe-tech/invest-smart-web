import type {
  InvestmentPlanRequest,
  SavedInvestmentPlan,
} from "./models/models";
import { authNetService } from "../network-service";

const investmentBaseUrl = "/investments";
const InvestmentUrls = {
  investments: `${investmentBaseUrl}`,
  save: `${investmentBaseUrl}/save-plan`,
  plans: `${investmentBaseUrl}/user-plans`,
  calculator: `${investmentBaseUrl}/calculate`,
  investment: (id: string) => `${investmentBaseUrl}/${id}`,
};

const getInvestments = async () => {
  return authNetService
    .get(`${InvestmentUrls.investments}`)
    .then((response) => response.data);
};

const deleteInvestment = async (id: string) =>
  authNetService
    .delete(InvestmentUrls.investment(id))
    .then((response) => response.data);

const getUserPlans = async () => {
  return authNetService
    .get(InvestmentUrls.plans)
    .then((response) => response.data);
};

const saveInvestmentPlan = async (data: SavedInvestmentPlan) => {
  return authNetService
    .post(InvestmentUrls.save, data)
    .then((response) => response.data);
};

const calculateInvestmentPlan = async ({
  unit,
  ...data
}: InvestmentPlanRequest) => {
  const duration = data?.durationMonths;
  const dto = {
    ...data,
    durationMonths: unit === "months" ? duration : duration * 12,
  };

  return authNetService
    .post(InvestmentUrls.calculator, dto)
    .then((response) => response.data);
};

export default {
  getUserPlans,
  getInvestments,
  deleteInvestment,
  saveInvestmentPlan,
  calculateInvestmentPlan,
};
