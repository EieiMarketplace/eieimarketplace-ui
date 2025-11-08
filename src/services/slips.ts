import axiosInstanceSlip from "@/lib/axios-slip";
import { SlipcreateResponse, SlipResponse, UserInfo } from "@/shared/interface";
import { signOut } from "next-auth/react";

export const slipService = {
  getSlips: async (reservationId: string): Promise<SlipResponse> => {
    const response = await axiosInstanceSlip.get<SlipResponse>(
      `/slip/reservation/${reservationId}`
    );
    // console.log("response", response);
    return response.data;
  },
  createSlip: async (
    reservationData: FormData,
    token: string
  ): Promise<SlipcreateResponse> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_Slip}/slip/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: reservationData, //   Content-Type multipart/form-data Auto Add
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Create slip successfully");
    }

    const data = await response.json();
    return data;
  },
};
