import axios from "axios";
import config from "../../../config";
const { hostUrl } = config;

const baseUrl = `${hostUrl}/users`;

const UsersUrls = {
  users: baseUrl,
  user: (id:string)=> `${baseUrl}/${id}`,
  currentUser: `${baseUrl}/current`,
  admins: `${baseUrl}/admins`,
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

const getCurrentUser = () => {
  return axios
    .get(`${UsersUrls.currentUser}`, {
      headers: {
        "Authorization":`Bearer ${localStorage.getItem('token')}`,
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

const deleteUser = (id:string, )=>{
  return axios
    .delete(UsersUrls.user(id))
    .then((response) => response.data);
}

export default {
  getUsers,
  deleteUser,
  getUserById,
  getAdminUsers,
  getCurrentUser,
};
