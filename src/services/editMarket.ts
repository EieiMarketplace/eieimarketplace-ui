import { MarketCreateRequest } from "@/shared/interface";

export async function editMarketService(marketData: MarketCreateRequest) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_Market}/markets/${marketData.id}`, // adjust endpoint if needed
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(marketData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Market creation failed");
  }

  const data = await response.json();
  return data;
}
