"use client";
import { VendorReservation } from "@/shared/interface";
import { useRouter } from "next/navigation";

interface VendorReservationCardProps {
  reservation: VendorReservation;
}

export default function VendorReservationCard({
  reservation,
}: VendorReservationCardProps) {
  const router = useRouter();

  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case "MERCHANT":
        return "bg-green-100 text-green-700 border-green-500";
      case "WAITFORPAY":
        return "bg-yellow-100 text-yellow-700 border-yellow-500";
      case "VALIDATESLIP":
        return "bg-yellow-100 text-yellow-700 border-yellow-500";
      case "RETIRE":
        return "bg-red-100 text-red-700 border-red-500";
      default:
        return "bg-blue-100 text-blue-700 border-blue-300";
    }
  };

  return (
    <div
      onClick={() =>
        router.push(`/vendor-dashboard/reservation/${reservation.id}`)
      }
      className="cursor-pointer bg-white border-l-8 p-5 rounded-2xl shadow-md transition-all hover:shadow-xl hover:-translate-y-1 border-blue-400 hover:border-purple-500  "
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-gray-800">
          {reservation.markets.market_name}{" "}
          <span className="text-gray-500 text-sm">
            ({reservation.markets.marketType})
          </span>
        </h3>
        <span
          className={`text-xs font-bold px-2 py-1 rounded-full ${
            reservation.markets.isOpen
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {reservation.markets.isOpen ? "Open" : "Closed"}
        </span>
      </div>

      <div className="text-sm text-gray-700 space-y-2">
        <p>
          <span className="font-medium">Reservation Date:</span> {"—"}
        </p>
        <p>
          <span className="font-medium">Product Name:</span>{" "}
          {reservation.product ?? "-"}
        </p>
        <p>
          <span className="font-medium">Log Detail:</span>{" "}
          {reservation.log ? (
            <div className="flex flex-wrap gap-4 mt-2">
              <span className="flex items-center px-3 py-1 rounded-lg shadow-sm">
                <span className="font-semibold  mr-1">Name:</span>
                {reservation.log.name ?? "-"}
              </span>
              <span className="flex items-center px-3 py-1 rounded-lg shadow-sm">
                <span className="font-semibold  mr-1">Size:</span>
                {reservation.log.size ?? "-"}
              </span>
              <span className="flex items-center px-3 py-1 rounded-lg shadow-sm">
                <span className="font-semibold mr-1">Price:</span>
                {reservation.log.price ?? "-"}
              </span>
            </div>
          ) : (
            <span className="text-gray-400 italic ml-2">No log details</span>
          )}
        </p>
      </div>

      <div className="mt-3 flex justify-end">
        <span
          className={`text-sm font-semibold px-3 py-1 rounded-full border ${getStatusStyle(
            reservation.vendorReservationStatus
          )}`}
        >
          {reservation.vendorReservationStatus}
        </span>
      </div>
    </div>
  );
}
