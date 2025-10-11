"use client";
import { getVendorReservation } from "@/services/getVendorReservation";
import { VendorReservation } from "@/shared/interface";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import VendorReservationCard from "../Market/vendor-reservation-card/ui";

export default function VendorDashboardPanel() {
  const { data: session } = useSession();
  const userID = session?.user.id;
  const token = session?.user?.token || "";
  const [reservations, setReservations] = useState<VendorReservation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getVendorReservation(userID as string, token);
      console.log("Fetched reservations:", result);
      setReservations(result);
    } catch (err) {
      console.error("Failed to fetch reservation:", err);
    } finally {
      setLoading(false);
    }
  }, [userID, token]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Reservations
      </h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading reservations...</p>
      ) : reservations.length === 0 ? (
        <p className="text-gray-500 text-center">No reservations found.</p>
      ) : (
        <div className="flex flex-col space-y-4 max-w-2xl mx-auto">
          {reservations.map((res) => (
            <VendorReservationCard key={res.id} reservation={res} />
          ))}
        </div>
      )}
    </div>
  );
}
