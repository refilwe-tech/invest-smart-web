import axios from "axios";
import config from "../../../config";
import { NewUser, registerDto } from "./DTOs";
const { hostUrl } = config;

const authBaseUrl = `${hostUrl}/auth`;
const AuthUrls = {
  register: `${authBaseUrl}/register`,
  login: `${authBaseUrl}/login`,
};

const register = (formData:NewUser) => {
  const dto = registerDto(formData);
  return axios.post(AuthUrls.register, dto, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    return response.data;
  } 

  )
    
};


export default {
  register,
};