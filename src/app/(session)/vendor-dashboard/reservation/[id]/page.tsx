import ReservationDetailPanel from "@/components/Reservation/ReservationDetailPanel/ui";

export default function VendorReservationDetailPage() {
  return (
    <div className="min-h-screen flex items-center content-center justify-center">
      <ReservationDetailPanel role={"VENDOR"}></ReservationDetailPanel>
    </div>
  );
}
