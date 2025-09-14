import config from "@/config";
import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: config.baseApi,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  function onRejected(error) {
    return Promise.reject(error);
  }
);
