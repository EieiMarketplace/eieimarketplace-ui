import { VendorReservation } from "@/shared/interface";

export async function getVendorReservation(
  id: string,
  token: string
): Promise<VendorReservation[]> {
  if (!id) throw new Error("Vendor ID is required");
  console.log("ID", id, process.env.NEXT_PUBLIC_API_URL_Reservation);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_Reservation}/reservations/vendor/${id}`, // your GET endpoint
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to fetch reservations");
  }

  const data: VendorReservation[] = await response.json();
  if (!data || Object.keys(data).length === 0) {
    throw new Error("Market not found");
  }

  return data;
}
