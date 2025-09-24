export async function editMarketService(Id: string, marketData: FormData) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_Market}/markets/${Id}`,
    {
      method: "PUT",
      body: marketData
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Market update failed");
  }

  return response.json();
}
