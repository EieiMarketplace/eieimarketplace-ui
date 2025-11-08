import { Market } from "@/shared/interface";

export async function getMarketFromId(id: string): Promise<Market> {
  if (!id) throw new Error("Market ID is required");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_Market}/markets/${id}`, // your GET endpoint
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to fetch market");
  }

  const data: Market = await response.json();
  if (!data || Object.keys(data).length === 0) {
    throw new Error("Market not found");
  }

  return data;
}
