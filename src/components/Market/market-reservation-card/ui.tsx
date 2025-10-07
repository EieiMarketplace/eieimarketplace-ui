"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Market } from "@/shared/interface";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";

interface Reservation {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorReservationStatus: string;
  log: string | null;
  marketId: string;
  createdTime: string;
  updatedTime: string;
}

const STATUS_OPTIONS = [
  "ALL",
  "APPLICATION",
  "WAITFORPAY",
  "VALIDATESLIP",
  "MERCHANT",
  "RETIRE",
];

export default function MarketReservationCard({ market }: { market: Market }) {
  const { data: session } = useSession();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  useEffect(() => {
    if (!market?.id || !session?.user?.token) return;

    const fetchReservations = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${process.env.NEXT_PUBLIC_API_URL_Reservation}/reservations/market/${market.id}?vendorReservationStatus=${filterStatus}`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        });

        setReservations(res.data);
      } catch (err: any) {
        console.error("Failed to fetch reservations:", err);
        setError(err.response?.data?.detail || "Failed to load reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [market?.id, session?.user?.token, filterStatus]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-2xl mt-6">
      <h2 className="text-xl font-semibold mb-4">Vendor Reservations</h2>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-4">
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
              filterStatus === status
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading && <p className="text-gray-500">Loading reservations...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && reservations.length === 0 && (
        <p className="text-gray-500 text-sm">
          No reservations found for {filterStatus}.
        </p>
      )}

      {!loading && reservations.length > 0 && (
        <div className="max-h-80 overflow-y-auto space-y-3 pr-2">
          {reservations.map((rsv, index) => (
            <Card
              key={rsv.id}
              className="border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-800">
                    Reservation #{index + 1}
                  </h3>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      rsv.vendorReservationStatus === "APPLICATION"
                        ? "bg-yellow-200 text-yellow-800"
                        : rsv.vendorReservationStatus === "WAITFORPAY"
                        ? "bg-blue-200 text-blue-800"
                        : rsv.vendorReservationStatus === "VALIDATESLIP"
                        ? "bg-purple-200 text-purple-800"
                        : rsv.vendorReservationStatus === "MERCHANT"
                        ? "bg-green-200 text-green-800"
                        : rsv.vendorReservationStatus === "RETIRE"
                        ? "bg-gray-300 text-gray-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {rsv.vendorReservationStatus}
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Vendor ID:</span>{" "}
                  {rsv.vendorId || "N/A"}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Vendor Name:</span>{" "}
                  {rsv.vendorName || "N/A"}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(rsv.createdTime).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
