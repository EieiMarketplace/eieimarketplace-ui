import axiosInstanceMarket from "@/lib/axios-market";
import {
  Market,
  MarketRequestParams,
  MarketResponse,
} from "@/shared/interface";

export const marketService = {
  getMarkets: async (): Promise<Market[]> => {
    const response = await axiosInstanceMarket.get<Market[]>(`/markets`);
    return response.data;
  },
  getMyMarkets: async ({
    marketRequestParams,
  }: {
    marketRequestParams: MarketRequestParams;
  }): Promise<MarketResponse> => {
    const response = await axiosInstanceMarket.get<MarketResponse>(
      `/markets/search`,
      {
        params: marketRequestParams,
      }
    );
    return response.data;
  },
};
