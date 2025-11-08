export async function patchReservation(
  marketId: string,
  vendorReservationPresentStatus: string,
  vendorReservationNextStatus: string,
  vendorId: string,
  reservationId: string,
  token: string,
  logName?: string,
) {
const reservationData = JSON.stringify({
    marketId,
    vendorReservationPresentStatus,
    vendorReservationNextStatus,
    vendorId,
    logName: logName ?? "",
});
console.log(reservationData, reservationId);
const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_Reservation}/reservations/reservation/change-status/${reservationId}`,
    {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: reservationData,
    }
);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Market update failed");
  }

  return response.json();
}
