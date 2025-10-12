"use client";

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
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { getMarketFromId } from "@/services/getMarketFromId";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ImageCard from "@/components/Market/image-card/ui";
import { useSession } from "next-auth/react";
import MarketReservationSubmitCard from "@/components/Market/market-reservation-submit-card/ui";
import MarketReservationCard from "@/components/Market/market-reservation-card/ui";

export default function MarketDetailPanel() {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const currentUserRole = session?.user?.role;

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
    return (
      <div className="p-10 text-center text-gray-500">
        Loading market details...
      </div>
    );
  }

  const isMarketOwner = currentUserId && market.userid === currentUserId;

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center w-full">
      <Card className="max-w-3xl flex flex-col w-full shadow-xl rounded-2xl  overflow-hidden">
        {/* Cover Image */}
        <img
          src={
            market.coverImageUrl
              ? market.coverImageUrl
              : "../images/Taiwan.jpg "
          }
          alt={market.marketName || "N/A"}
          className="w-full h-full object-cover"
        />

        <CardContent className="w-full p-8 space-y-6">
          {/* Market Name */}
          <h1 className="text-3xl font-bold text-gray-800">
            {market.marketName || "N/A"}
          </h1>

          <div className="flex items-center gap-2">
            {/* Market Type */}
            <span
              className={`text-sm ${
                market.marketType == "Market" ? "bg-orange-500" : "bg-blue-700"
              } text-white px-2 py-1 rounded-full`}
            >
              {market.marketType || "Market"}
            </span>

            {/* isOpen Badge */}
            <span
              className={`text-sm px-2 py-1 rounded-full font-bold ${
                market.isOpen
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              }`}
            >
              {market.isOpen ? "Opened" : "Closed"}
            </span>
          </div>

          {/* Address */}
          <div className="flex items-center text-gray-600 gap-2">
            <MapPin className="h-5 w-5" />
            <span>{market.address || "N/A"}</span>
          </div>

          {/* Detail */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Detail</h2>
            <p className="text-gray-600 leading-relaxed">
              {market.detail || "N/A"}
            </p>
          </div>

          {/* Rule */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Rules</h2>
            <p className="text-gray-600 leading-relaxed">
              {market.rule || "N/A"}
            </p>
          </div>

          {/* Market Plan Keys */}
          <div className="">
            <label className="block mb-1 text-sm font-medium">
              Market Plan
            </label>
            <div className="flex content-center justify-center w-full my-5">
              {market.marketPlanKeys && market.marketPlanKeys.length > 0 ? (
                <div className="w-full">
                  <Carousel className="w-full">
                    <CarouselContent className="h-80">
                      {market.marketPlanKeys.map((plan, index) => (
                        <CarouselItem
                          key={plan.marketPlanImageUrl}
                          className="flex justify-center"
                        >
                          <Dialog key={index}>
                            <DialogTrigger asChild>
                              <div className="w-full cursor-pointer">
                                <ImageCard
                                  url={plan.marketPlanImageUrl!}
                                  alt={`plan-${index}`}
                                />
                              </div>
                            </DialogTrigger>
                            <DialogContent className="sm:!max-w-max">
                              <VisuallyHidden>
                                <DialogTitle>
                                  Market Plan {index + 1}
                                </DialogTitle>
                              </VisuallyHidden>
                              <img
                                src={
                                  plan.marketPlanImageUrl ||
                                  "../images/Market_Plan.jpg"
                                }
                                className="h-100 rounded-md"
                              />
                            </DialogContent>
                          </Dialog>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <img
                      src={"../images/Market_Plan.jpg"}
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
            {/* <div className="grid grid-cols-1 gap-4">
              {market.marketPlanKeys && market.marketPlanKeys.length > 0 ? (
                market.marketPlanKeys!!.map((plan, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <img
                        src={
                          plan.marketPlanImageUrl || "../images/Market_Plan.jpg"
                        }
                        className="w-full h-48 object-cover rounded-md cursor-pointer hover:opacity-90 transition"
                      />
                    </DialogTrigger>
                    <DialogContent className="sm:!max-w-max">
                      <VisuallyHidden>
                        <DialogTitle>Market Plan {index + 1}</DialogTitle>
                      </VisuallyHidden>
                      <img
                        src={
                          plan.marketPlanImageUrl || "../images/Market_Plan.jpg"
                        }
                        className="rounded-md"
                      />
                    </DialogContent>
                  </Dialog>
                ))
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <img
                      src={"../images/Market_Plan.jpg"}
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
            </div> */}
          </div>

          {/* Logs */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Logs</h2>
            {market.logs && market.logs.length > 0 ? (
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">
                        #
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">
                        Size
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {market.logs.map((log, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-2 text-gray-700">{index + 1}</td>
                        <td className="px-4 py-2 text-gray-800 font-medium">
                          {log.name}
                        </td>
                        <td className="px-4 py-2 text-gray-800 font-medium">
                          {log.size}
                        </td>
                        <td className="px-4 py-2 text-gray-700">
                          {log.price.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No logs available</p>
            )}
          </div>

          {/* Edit Button */}
          {/* Show Edit button only if user owns this market */}
          {isMarketOwner && (
            <div className="flex justify-end">
              <button
                onClick={() => {
                  window.location.href = `/my-market/${id}/edit`;
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
            </div>
          )}
          {currentUserRole == "vendor" && market.isOpen && (
            <MarketReservationSubmitCard market={market} />
          )}
          {isMarketOwner && <MarketReservationCard market={market} />}
        </CardContent>
      </Card>
    </div>
  );
}
