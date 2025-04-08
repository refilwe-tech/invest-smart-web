import axios from "axios";
import config from "../../../config";
import { countsModel } from "./models/models";
const { hostUrl } = config;

const DashboardUrls = {
  counts: `${hostUrl}/counts`,
};

const getCounts = (token:string) => {

  return axios
    .get(`${DashboardUrls.counts}`, {
      headers: {
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => countsModel(response.data));
};

export default {
  getCounts,
};
