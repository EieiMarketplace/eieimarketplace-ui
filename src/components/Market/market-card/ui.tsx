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
      className="!py-0 !space-y-0 !gap-0 overflow-hidden shadow-lg cursor-pointer hover:-translate-y-1 hover:shadow-2xl"
      onClick={(e) => {
        e.preventDefault();
        router.push(`/${detailPath}/${market.id}`);
      }}
    >
      <img
        src={
          market.coverImageUrl ? market.coverImageUrl : "./images/Taiwan.jpg"
        }
        alt={market.marketName || NOT_FOUND}
        className="w-full h-[50%] object-cover"
      />
      <div className="bg-green-600 text-white p-4 font-semibold text-xl">
        {market.marketName || NOT_FOUND}
      </div>
      <CardContent className="text-sm">
        <div className="flex items-center gap-1 text-gray-700 py-3 font-semibold">
          <MapPin />
          {market.address || NOT_FOUND}
        </div>
        <p className="mt-2 text-gray-600">{market.detail || NOT_FOUND}</p>
      </CardContent>
    </Card>
  );
}
