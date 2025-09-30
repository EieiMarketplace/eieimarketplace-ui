export async function editMarketService(
  Id: string,
  marketData: FormData,
  token: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_Market}/markets/${Id}`,

    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: marketData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Market update failed");
  }

  return response.json();
}
