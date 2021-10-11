import nodeAxios from "axios";

const axios = nodeAxios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

axios.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + localStorage.getItem("saldo-token");
  return config;
});

export default axios;
