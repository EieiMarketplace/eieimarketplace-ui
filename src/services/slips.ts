import axiosInstanceSlip from "@/lib/axios-slip";
import { SlipResponse, UserInfo } from "@/shared/interface";
import { signOut } from "next-auth/react";

export const slipService = {
  getSlips: async (reservationId: string): Promise<SlipResponse> => {
    const response = await axiosInstanceSlip.get<SlipResponse>(
      `/slip/reservation/${reservationId}`
    );
    // console.log("response", response);
    return response.data;
  },
};
