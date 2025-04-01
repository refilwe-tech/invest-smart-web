import axios from "axios";
import config from "../../../config";
const { hostUrl } = config;

const baseUrl = `${hostUrl}/users`;

const UsersUrls = {
  users: baseUrl,
  admins:`${baseUrl}/admins`
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

const getAdminUsers = () => {
  return axios
    .get(`${UsersUrls.admins}`, {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((response) => response.data);
};


export default {
  getUsers,
  getAdminUsers,
};