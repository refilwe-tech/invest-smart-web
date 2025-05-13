import axios from "axios";
import config from "../../../config";
import type { User } from "./models/models";
import { profileDto } from "./dto/dto";
import { type NewUser, newUserDto } from "../auth-service";
const { hostUrl } = config;

const baseUrl = `${hostUrl}/users`;

const UsersUrls = {
  users: baseUrl,
  user: (id: string) => `${baseUrl}/${id}`,
  currentUser: `${baseUrl}/current`,
  admins: `${hostUrl}/admins`,
};

const get = (url: string) => {
  return axios
    .get(url, {
      headers: {
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => response.data);
};
const getUsers = () => get(UsersUrls.users);

const getAdminUsers = () => get(UsersUrls.admins);

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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    .patch(UsersUrls.user(user?.id ?? ""), dto)
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

const createAdminUser = (formData: NewUser) => {
  const dto = newUserDto(formData);
  return axios
    .post(UsersUrls.admins, dto, {
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
  createAdminUser,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAdminUsers,
  getCurrentUser,
};
