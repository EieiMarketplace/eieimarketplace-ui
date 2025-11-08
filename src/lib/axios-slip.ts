import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getSession } from "next-auth/react";

const axiosInstanceSlip = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_Slip,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstanceSlip.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await getSession();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken.user?.token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstanceSlip.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      window.location.href = "/auth/signin";
    }

    return Promise.reject(error);
  }
);

export default axiosInstanceSlip;
