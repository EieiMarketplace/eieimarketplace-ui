"use client"

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Market } from "@/shared/interface";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { getMarketFromId } from "@/services/getMarketFromId";

export default function MarketDetailPanel() {
  const params = useParams();
  const id = params?.id as string; 
  const [market, setMarket] = useState<Market | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchMarket = async () => {
      try {
        const data = await getMarketFromId(id);
        setMarket(data);
      } catch (err) {
        console.error("Failed to fetch");
        //console.error("Failed to fetch market detail:", err);
      }
    };
    fetchMarket();
  }, [id]);

  if (!market) {
    return <div className="p-10 text-center text-gray-500">Loading market details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <Card className="max-w-3xl w-full shadow-xl rounded-2xl overflow-hidden">
        {/* Cover Image */}
        <img
          src={"../images/Taiwan.jpg"}
          alt={market.marketName || "N/A"}
          className="w-full h-full object-cover"
        />

        <CardContent className="p-8 space-y-6">
          {/* Market Name */}
          <h1 className="text-3xl font-bold text-gray-800">{market.marketName || "N/A"}</h1>

          {/* Address */}
          <div className="flex items-center text-gray-600 gap-2">
            <MapPin className="h-5 w-5" />
            <span>{market.address || "N/A"}</span>
          </div>

          {/* Detail */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Detail</h2>
            <p className="text-gray-600 leading-relaxed">{market.detail || "N/A"}</p>
          </div>

          {/* Rule */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Rules</h2>
            <p className="text-gray-600 leading-relaxed">{market.rule || "N/A"}</p>
          </div>

          {/* Market Plan Keys */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Market Plans</h2>
            <div className="grid grid-cols-1 gap-4">
              {market.marketPlanKeys.length !== 0 ? (
                market.marketPlanKeys.map((plan, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <img
                        src={plan.marketPlanKey || "../images/Market_Plan.jpg"}
                        className="w-full h-48 object-cover rounded-md cursor-pointer hover:opacity-90 transition"
                      />
                    </DialogTrigger>
                    <DialogContent className="sm:!max-w-max">
                      <VisuallyHidden>
                        <DialogTitle>Market Plan {index + 1}</DialogTitle>
                      </VisuallyHidden>
                      <img
                        src={plan.marketPlanKey || "../images/Market_Plan.jpg"}
                        className="rounded-md"
                      />
                    </DialogContent>
                  </Dialog>

                ))
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <img
                      src={ "../images/Market_Plan.jpg"}
                      className="w-full h-full object-cover rounded-md cursor-pointer hover:opacity-90 transition"
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:!max-w-max">
                  <VisuallyHidden>
                    <DialogTitle>Market Plan</DialogTitle>
                  </VisuallyHidden>
                  <img
                    src="../images/Market_Plan.jpg"
                    className="rounded-md"
                  />
                </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => {
                window.location.href = `/my-market/${id}/edit`;
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Edit
            </button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}