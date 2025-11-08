import { Card, CardContent } from "@/components/ui/card";
import { NOT_FOUND } from "@/shared/constant";
import { Market } from "@/shared/interface";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export function MarketCard({
  market,
  detailPath,
}: {
  market: Market;
  detailPath: string;
}) {
  const router = useRouter();

  return (
    <Card
      key={market.id}
      className="!py-0 !space-y-0 !gap-0 overflow-hidden shadow-lg cursor-pointer hover:-translate-y-1 hover:shadow-2xl h-[400px]"
      onClick={(e) => {
        e.preventDefault();
        router.push(`/${detailPath}/${market.id}`);
      }}
    >
      <div className="h-[50%] w-full">
        <img
          src={market.coverImageUrl ? market.coverImageUrl : "./images/Taiwan.jpg"}
          alt={market.marketName || NOT_FOUND}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Market Name + Status */}
      <div className="bg-green-600 text-white p-4 flex items-center justify-between">
        <span className="font-semibold text-xl">
          {market.marketName || NOT_FOUND}
        </span>

        <div className="flex items-center gap-2">
          {/* Market Type */}
          <span className={`text-sm ${ market.marketType == "Market" ? "bg-orange-500" : "bg-blue-700"} text-white px-2 py-1 rounded-full`}>
            {market.marketType || NOT_FOUND}
          </span>

          {/* isOpen Badge */}
          <span
            className={`text-sm px-2 py-1 rounded-full font-bold ${
              market.isOpen ? "bg-green-100 text-green-800" : "bg-red-300 text-red-800"
            }`}
          >
            {market.isOpen ? "Opened" : "Closed"}
          </span>
        </div>
      </div>

      <CardContent className="text-sm space-y-3">
        {/* Address */}
        <div className="flex items-center gap-1 text-gray-700 font-semibold">
          <MapPin />
          {market.address || NOT_FOUND}
        </div>

        {/* Detail */}
        <p className="mt-2 text-gray-600 truncate">
          {market.detail || NOT_FOUND}
        </p>
      </CardContent>
    </Card>
  );
}
