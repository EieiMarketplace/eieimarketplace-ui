export async function editMarketService(marketData: {
    id: string;
    marketName: string;
    address: string;
    coverImageKey: string;
    marketPlanKeys: string[];
    logs: any[];
    detail: string;
    rule: string;
    userid: string;
}) {
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
