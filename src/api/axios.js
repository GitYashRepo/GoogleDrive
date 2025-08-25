import axios from 'axios';

const baseHostedurl = import.meta.env.VITE_WEBTECHWARE_VERCEL_URL;

const axiosInstance = axios.create({
  baseURL: `${baseHostedurl}`,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("gdtoken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
