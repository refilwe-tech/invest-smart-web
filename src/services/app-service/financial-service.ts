import axios from "axios";

import config from "../../../config";
import { newUserFinancialDto, userFinancialDto } from "./dto/dto";
import type { UserFinances } from "./models/models";

const { hostUrl } = config;
const baseUrl = `${hostUrl}/finances`;

const FinancesUrls = {
  finances: baseUrl,
  goals:`${baseUrl}/goals`,
  userFinances: (id: string) => `${baseUrl}/${id}`,
  userFinancialProfile: (id: string) => `${baseUrl}/profile/${id}`,
  userFinancialGraph: (id: string) => `${baseUrl}/${id}/data`,
}

const createFinancialProfile = (user: UserFinances) => {
  const dto = newUserFinancialDto(user);
  return axios
    .post(FinancesUrls.finances, dto,{headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }})
    .then((response) => response.data);
};


const updateFinancialProfile = (user: UserFinances) => {
  const dto = userFinancialDto(user);
  return axios
    .put(FinancesUrls.userFinances(user?.userId ?? ""), dto, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => response.data);
};

const getUserFinancialProfile = (id: string) => {
  return axios
    .get(`${FinancesUrls.finances}/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => response.data);
};

const getFinancialGraph = (id: string) => {
  return axios
    .get(FinancesUrls.userFinancialGraph(id), {
      headers: {
        "ngrok-skip-browser-warning": true,   
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => response.data);
};

const getInvestmentGoals = ()=>{
  return axios
    .get(FinancesUrls.goals, {
      headers: {
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => response.data); 
}

export default {
  getFinancialGraph,
  getInvestmentGoals,
  createFinancialProfile,
  updateFinancialProfile,
  getUserFinancialProfile,
};