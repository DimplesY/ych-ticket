import axios from "axios";

import { Toast } from "vant";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  // timeout: 1000,
  withCredentials: true,
});
console.log("环境变量URL", process.env.VUE_APP_BASE_URL);

instance.interceptors.request.use(
  (config) => {
    Toast.loading("加载中...");
    return config;
  },
  (error) => {
    Toast.clear();
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    Toast.clear();
    const { data } = response;
    if (data.code === 400) {
      Toast.fail(data.msg)
      return response;
    }
    return data;
  },
  (error) => {
    Toast.clear();
    return Promise.reject(error);
  }
);

export default instance;
