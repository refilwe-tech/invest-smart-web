import axios from "axios";
import config from "../../../config";
import { countsModel } from "./models/models";
import { useAuthStore } from "../../store";
const { hostUrl } = config;

const DashboardUrls = {
  counts: `${hostUrl}/counts`,
};

const getCounts = (token:string) => {

  return axios
    .get(`${DashboardUrls.counts}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => countsModel(response.data));
};

export default {
  getCounts,
};
