"use client";

import { getReservationDetail } from "@/services/getReservationDetail";
import type { ReservationDetail } from "@/shared/interface";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface ReservationDetailProps {
  role: string; // "VENDOR" and "ORANZIER"
}

export default function ReservationDetail({ role }: ReservationDetailProps) {
  const { data: session } = useSession();
  const userID = session?.user.id;
  const token = session?.user?.token || "";
  const [reservationDetail, setReservationDetail] =
    useState<ReservationDetail>();
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const id = params?.id as string;

  const fetchReservations = useCallback(async () => {
    try {
      console.log("Fetching reservation with ID:", id);
      setLoading(true);
      const result = await getReservationDetail(id, token);
      console.log("Fetched reservation:", result);
      setReservationDetail(result);
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
        Reservation Detail
      </h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading reservation...</p>
      ) : (
        <>Hello World</>
      )}
    </div>
  );
}
