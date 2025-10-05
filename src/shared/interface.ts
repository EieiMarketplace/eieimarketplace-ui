// export interface ApiResponse<T> {
//   status: number;
//   data: T;
//   error: ApiError | null;
// }

// export interface ApiError {
//   errorCode: string;
//   errorMessage: string;
//   details?: string[] | null;
// }
export interface MarketRequestParams {
  market_name: string;
  address: string;
  detail: string;
  user_id: string;
  limit: string;
  offset: string;
}

export interface MarketResponse {
  market: Market[];
  total_count: number;
  limit: number;
}

export interface Market {
  id?: string;
  marketName: string;
  address: string;
  coverImageKey: string;
  marketPlanKeys?: MarketPlanKey[];
  deletedMarketKeys?: string[];
  logs: MarketLog[];
  detail: string;
  rule: string;
  userid: string;
  coverImageUrl?: string;
  isOpen: boolean;
  marketType: string;
}

export interface MarketCreateRequest extends Market {
  newCoverImageFile?: File | null;
  // newMarketPlanImageFiles?: File[];
}

export interface MarketPlanKey {
  marketPlanKey: string;
  marketPlanImageUrl?: string;
  marketPlanImageFile?: File;
}

export interface MarketLog {
  name: string;
  size: string;
  price: number;
  user_id: string;
  reservation_id: string;
}

export interface UserInfo {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
}

export interface VendorReservation {
  id: string;
  vendorId: string;
  product: string;
  markets: {
    market_name: string;
    isOpen: boolean;
    marketType: string;
  };
  vendorReservationStatus: string;
  log?: MarketLog | null;
}

export interface ReservationDetail {
  vendorName: string;
  vendorReservationStatus: string;
  vendorId: string;
  marketID: string;
  marketInfo: {
    market_name: string;
    isOpen: boolean;
    marketType: string;
  };
  reservationProduct: string;
  reservationDetail: string;
  Log: MarketLog[];
}