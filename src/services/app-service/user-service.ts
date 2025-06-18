import { authNetService } from "../network-service";
import type { User } from "./models/models";
import { profileDto } from "./dto/dto";
import { type NewUser, newUserDto } from "../auth-service";

const baseUrl = "/users";

const UsersUrls = {
  users: baseUrl,
  user: (id: string) => `${baseUrl}/${id}`,
  currentUser: `${baseUrl}/current`,
  admins: "/admins",
};

const get = (url: string) => {
  return authNetService.get(url).then((response) => response.data);
};
const getUsers = () => get(UsersUrls.users);

const getAdminUsers = () => get(UsersUrls.admins);

const getCurrentUser = () => {
  return authNetService
    .get(UsersUrls.currentUser, {
      headers: {
        Pragma: "no-cache",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
    .then((response) => response.data);
};

const getUserById = async (id: string) => {
  return authNetService
    .get(`${UsersUrls.users}/${id}`)
    .then((response) => response.data);
};

const deleteUser = async (id: string) => {
  return authNetService
    .delete(UsersUrls.user(id))
    .then((response) => response.data);
};

const updateUser = async (user: User) => {
  const dto = profileDto(user);
  return authNetService
    .patch(UsersUrls.user(user?.id ?? ""), dto)
    .then((response) => response.data);
};

const createUser = async (formData: NewUser) => {
  const dto = newUserDto(formData);
  return authNetService.post(UsersUrls.users, dto).then((response) => {
    return response.data;
  });
};

const createAdminUser = async (formData: NewUser) => {
  const dto = newUserDto(formData);
  return authNetService.post(UsersUrls.admins, dto).then((response) => {
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
