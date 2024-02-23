import axios, { AxiosError } from "axios";
import { getToken } from "./token";
import { userStore } from "../stores/user";
import { router } from "../router";
import { message } from "antd";

export const request = axios.create({
  baseURL: "http://localhost:7001/api",
});

request.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers["Authorization"] = token;

  return config;
});

request.interceptors.response.use(
  (res) => {
    if (res.data.code === -1) {
      throw Error(res.data.message);
    }
    return res.data.data;
  },
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      // TODO: 需重新登录
      userStore.logout();
      router.navigate("/login");
      message.error("请重新登录");
      return new Promise(() => ({}));
    }
    throw err;
  }
);
