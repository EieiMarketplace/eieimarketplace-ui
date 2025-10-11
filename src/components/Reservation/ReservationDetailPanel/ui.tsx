"use client";

import { Card, CardContent } from "@/components/ui/card";
import { getReservationDetail } from "@/services/getReservationDetail";
import type { ReservationDetail } from "@/shared/interface";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ReservationDataPart from "../ReservationDataPart/ui";
import { ReservationStatus } from "@/shared/enum";

export default function ReservationDetailPanel() {
  const { data: session } = useSession();
  const userID = session?.user.id;
  const token = session?.user.token!;
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
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  return (
    <>
      {/* <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Reservation Detail
      </h2> */}

      {loading ? (
        <p className="text-gray-500 text-center">Loading reservation...</p>
      ) : (
        // <CardContent className="text-sm space-y-3">
        <ReservationDataPart reservationData={reservationDetail!} />
        // </CardContent>
      )}

      {/* 
      <Card className="max-w-3xl flex flex-col w-full shadow-xl rounded-2xl  overflow-hidden p-3">
      </Card>
      */}
    </>
  );
}
