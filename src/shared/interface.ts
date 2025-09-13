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
}

export interface MarketLog {
  size: string;
  price: number;
  userID: number;
  reservationID: number;
}

export interface Market {
  id: string;
  marketName: string;
  address: string;
  coverImageKey: string;
  marketPlanKeys: MarketPlanKey[];
  logs: MarketLog[];
  detail: string;
  rule: string;
  userid: string;
}

export interface MarketRequestParams {
  market_name: string;
  address: string;
  detail: string;
  user_id: string;
  limit: string;
  offset: string;
}
