import { ReservationDetail, VendorReservation } from "@/shared/interface";

export async function getReservationDetail(
  id: string,
  token: string
): Promise<ReservationDetail> {
  if (!id) throw new Error("Reservation ID is required");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_Reservation}/reservations/${id}`, // your GET endpoint
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
    throw new Error(errorData.detail || "Failed to fetch reservation");
  }

  const data: ReservationDetail = await response.json();
  if (!data) {
    throw new Error("Reservation not found");
  }

  return data;
}
