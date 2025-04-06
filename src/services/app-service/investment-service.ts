import axios from "axios";
import config from "../../../config";
const { hostUrl } = config;

const investmentBaseUrl = `${hostUrl}/investments`
const InvestmentUrls = {
  investments: `${investmentBaseUrl}`,
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


export default {
  getInvestments,
  deleteInvestment,
};