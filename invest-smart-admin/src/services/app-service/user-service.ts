import axios from "axios";
import config from "../../../config";
const { hostUrl } = config;

const UsersUrls = {
  users: `${hostUrl}/users`,
};

const getUsers = () => {
  return axios
    .get(`${UsersUrls.users}`, {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((response) => response.data);
};


export default {
  getUsers,
};