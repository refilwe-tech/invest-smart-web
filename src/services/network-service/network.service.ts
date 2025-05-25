import axios from "axios";
import config from "../../../config";

const { hostUrl } = config;

export const authNetService = axios.create({
  baseURL: hostUrl,
  headers: {
    "ngrok-skip-browser-warning": true,
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    Accept: "*",
  },
});

export const noAuthService = axios.create({
  baseURL: `${hostUrl}/auth`,
  headers: {
    "ngrok-skip-browser-warning": true,
    "Content-Type": "application/json",
    Accept: "*",
  },
});
