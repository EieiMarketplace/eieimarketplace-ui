import axiosInstance from "@/lib/axios";
import { UserInfo } from "@/shared/interface";

export const userInfoService = {
  getUserInfo: async (): Promise<UserInfo> => {
    const response = await axiosInstance.get<UserInfo>(`/users/info`);
    // console.log("response", response);
    return response.data;
  },
  logout: async (): Promise<void> => {
    const response = await axiosInstance.post<void>("/users/logout");

    // return response
  },
};
