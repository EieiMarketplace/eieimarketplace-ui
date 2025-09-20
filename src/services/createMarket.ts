export async function createMarketService(marketData: FormData) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_Market}/markets`,
    {
      method: "POST",
      body: marketData, //   Content-Type multipart/form-data Auto Add
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Market creation failed");
  }

  const data = await response.json();
  return data;
}
