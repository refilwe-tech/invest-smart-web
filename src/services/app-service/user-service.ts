import axios from "axios";
import config from "../../../config";
import { User, UserFinances } from "./models/models";
import { newUserFinancialDto, profileDto, userFinancialDto } from "./dto/dto";
import { NewUser, newUserDto } from "../auth-service";
const { hostUrl } = config;

const baseUrl = `${hostUrl}/users`;

const UsersUrls = {
  users: baseUrl,
  user: (id: string) => `${baseUrl}/${id}`,
  currentUser: `${baseUrl}/current`,
  finances: `${hostUrl}/finances`,
  userFinances: (id: string) => `${hostUrl}/finances/${id}`,
  admins: `${baseUrl}/admins`,
};

const getUsers = () => {
  return axios
    .get(`${UsersUrls.users}`, {
      headers: {
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => response.data);
};

const getAdminUsers = () => {
  return axios
    .get(`${UsersUrls.admins}`, {
      headers: {
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => response.data);
};

const getCurrentUser = () => {
  return axios
    .get(`${UsersUrls.currentUser}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((response) => response.data);
};

const getUserById = (id: string) => {
  return axios
    .get(`${UsersUrls.users}/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((response) => response.data);
};

const getUserProfileById = (id: string) => {
  return axios
    .get(`${UsersUrls.finances}/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((response) => response.data);
};

const deleteUser = (id: string) => {
  return axios.delete(UsersUrls.user(id)).then((response) => response.data);
};

const updateUser = (user: User) => {
  const dto = profileDto(user);
  return axios
    .put(UsersUrls.user(user?.id ?? ""), dto)
    .then((response) => response.data);
};

const updateInvestment = (user: UserFinances) => {
  const dto = userFinancialDto(user);
  return axios
    .put(UsersUrls.userFinances(user?.userId ?? ""), dto)
    .then((response) => response.data);
};

const createInvestment = (user: UserFinances) => {
  const dto = newUserFinancialDto(user);
  return axios
    .post(UsersUrls.finances, dto)
    .then((response) => response.data);
};

const createUser = (formData: NewUser) => {
  const dto = newUserDto(formData);
  return axios
    .post(UsersUrls.users, dto, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    });
};

export default {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAdminUsers,
  getCurrentUser,
  createInvestment,
  updateInvestment,
  getUserProfileById,
};
