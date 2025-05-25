import { noAuthService } from "../network-service";
import { type LoginUser, type NewUser, newUserDto } from "./DTOs";

const AuthUrls = {
  register: "/register",
  login: "/login",
};

const register = async (formData: NewUser) => {
  const dto = newUserDto(formData);
  return noAuthService
    .post(AuthUrls.register, dto)
    .then((response) => response.data);
};

const login = async (formData: LoginUser) =>
  noAuthService
    .post(AuthUrls.login, formData)
    .then((response) => response.data);

export default {
  login,
  register,
};
