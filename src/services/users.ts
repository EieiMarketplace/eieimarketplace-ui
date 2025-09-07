import axiosInstance from "@/lib/axios";
import { ApiResponse } from "@/shared/interface";

export const userService = {
  getUsers: async (): Promise<ApiResponse<any>> => {
    const response = await axiosInstance.get<ApiResponse<any>>(
      `/users/users?skip=0&limit=100`
    );
    console.log("Response Data:", response);
    return response.data;
  },
};
