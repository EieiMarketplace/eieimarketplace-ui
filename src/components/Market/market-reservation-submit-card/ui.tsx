"use client";

import { Market } from "@/shared/interface";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";

export default function MarketReservationSubmitCard({
  market,
}: {
  market: Market;
}) {
  const { data: session } = useSession();
  const [message, setMessage] = useState<string | null>(null);
  const [product, setProduct] = useState("");
  const [detail, setDetail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      setMessage("You must be logged in to reserve.");
      return;
    }
    try {
      setLoading(true);
      setMessage(null);

      const payload = {
        product,
        detail,
        //userId: session.user.id, // from session
        marketId: market.id, // from props
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_Reservation}/reservations/reserve`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`, // use token from session
          },
        }
      );

      setMessage("Reservation submitted successfully!");
      setProduct("");
      setDetail("");
    } catch (error) {
      console.error(error);
      setMessage("Reservation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Reserve Market</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Product</label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Detail</label>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Reservation"}
        </button>
      </form>
      {message && (
        <p className="mt-3 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
}
