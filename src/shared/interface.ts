import { Blob } from "buffer";

export interface ApiResponse<T> {
  status: number;
  data: T;
  error: ApiError | null;
}

export interface ApiError {
  errorCode: string;
  errorMessage: string;
  details?: string[] | null;
}

export interface MarketPlanKey {
  marketPlanKey: string;
  marketPlanImageUrl?: string;
}

export interface MarketLog {
  size: string;
  price: number;
  user_id: number;
  reservation_id: number;
}

export interface Market {
  id?: string;
  marketName: string;
  address: string;
  coverImageKey: string;
  marketPlanKeys?: MarketPlanKey[];
  logs: MarketLog[];
  detail: string;
  rule: string;
  userid: string;
  coverImageUrl?: string;
}

export interface MarketCreateRequest extends Market {
  coverImageFile?: File | null;
  marketPlanImageFiles?: File[];
}

export interface MarketRequestParams {
  market_name: string;
  address: string;
  detail: string;
  user_id: string;
  limit: string;
  offset: string;
}
