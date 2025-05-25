import { countsModel } from "./models/models";
import { authNetService } from "../network-service";

const DashboardUrls = {
  counts: "/counts",
};

const getCounts = () => {
  return authNetService
    .get(`${DashboardUrls.counts}`)
    .then((response) => countsModel(response.data));
};

export default {
  getCounts,
};
