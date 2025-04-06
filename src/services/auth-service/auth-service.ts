import axios from "axios";
import config from "../../../config";
import { LoginUser, NewUser, newUserDto } from "./DTOs";
const { hostUrl } = config;

const authBaseUrl = `${hostUrl}/auth`;
const AuthUrls = {
  register: `${authBaseUrl}/register`,
  login: `${authBaseUrl}/login`,
};

const register = (formData: NewUser) => {
  const dto = newUserDto(formData);
  return axios
    .post(AuthUrls.register, dto, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    });
};

const login = (formData: LoginUser) => {
  return axios
    .post(AuthUrls.login, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    });
};

export default {
  login,
  register,
};
