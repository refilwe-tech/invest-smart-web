import axios from "axios";
import config from "../../../config";
const { hostUrl } = config;

const InvestmentUrls = {
  investments: `${hostUrl}/investments`,
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


export default {
  getInvestments,
};