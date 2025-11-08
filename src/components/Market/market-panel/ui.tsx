"use client";
import { useEffect, useState } from "react";
import MarketHeader from "../market-header/ui";
import { Market } from "@/shared/interface";
import { Button } from "@/components/ui/button";
import { MarketCard } from "../market-card/ui";
import { marketService } from "@/services/market";

export default function MarketPanel() {
  const [search, setSearch] = useState("");
  const [markets, setMarkets] = useState<Market[]>([]);
  const fetchMarkets = async () => {
    try {
      const res = await marketService.getMarkets();
      setMarkets(res);
    } catch (err) {
      console.error("Failed to fetch markets:", err);
    }
  };
  useEffect(() => {
    fetchMarkets();
  }, []);

  const filteredMarkets = markets.filter((m) =>
    m.marketName.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="w-full pt-[50px]">
      <MarketHeader search={search} setSearch={setSearch} />

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMarkets.map((market) => (
          <MarketCard market={market} key={market.id} detailPath="markets" />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 pb-6">
        <Button variant="outline" size="sm">
          1
        </Button>
        <Button variant="ghost" size="sm">
          2
        </Button>
        <span className="text-gray-500">...</span>
        <Button variant="ghost" size="sm">
          9
        </Button>
        <Button variant="ghost" size="sm">
          10
        </Button>
      </div>
    </div>
  );
}
