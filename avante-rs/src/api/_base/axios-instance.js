import axios from "axios";
import { API_URL } from "../../constants";
import { USER_KEY } from "../../context/user/user.context";


export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const user = localStorage.getItem(USER_KEY);
  const token = JSON.parse(user)?.token;
  
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
