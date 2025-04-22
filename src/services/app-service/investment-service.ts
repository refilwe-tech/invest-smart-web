import axios from "axios";
import config from "../../../config";
import type { InvestmentPlanRequest, SavedInvestmentPlan } from "./models/models";
const { hostUrl } = config;

const investmentBaseUrl = `${hostUrl}/investments`
const InvestmentUrls = {
  investments: `${investmentBaseUrl}`,
  save: `${investmentBaseUrl}/save-plan`,
  plans: `${investmentBaseUrl}/user-plans`,
  calculator: `${investmentBaseUrl}/calculate`,
  investment:(id:string)=>`${investmentBaseUrl}/${id}`
};

const getInvestments = () => {
  return axios
    .get(`${InvestmentUrls.investments}`, {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((response) => response.data);
};

const deleteInvestment = (id:string)=>{
  return axios
  .delete(InvestmentUrls.investment(id))
  .then((response) => response.data);
}

const getUserPlans = () => {
  return axios
    .get(InvestmentUrls.plans, {
      headers: {
        "ngrok-skip-browser-warning": true, 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => response.data);
};

const saveInvestmentPlan = (data: SavedInvestmentPlan) => {
  return axios
    .post(InvestmentUrls.save, data, {
      headers: {
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => response.data);
};

const calculateInvestmentPlan = (data: InvestmentPlanRequest) => {
  return axios.post(InvestmentUrls.calculator, data, {
    headers: {
      "ngrok-skip-browser-warning": true,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  .then((response) => response.data);
};



export default {
  getUserPlans,
  getInvestments,
  deleteInvestment,
  saveInvestmentPlan,
  calculateInvestmentPlan,
};