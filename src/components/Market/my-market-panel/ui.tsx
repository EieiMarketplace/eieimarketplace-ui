"use client";
import { useCallback, useEffect, useState } from "react";
import { Market, MarketRequestParams } from "@/shared/interface";
import { MarketCard } from "../market-card/ui";
import { marketService } from "@/services/market";
import MyMarketHeader from "../mymarket-header/ui";
import { useLoading } from "@/shared/context/Loading";
import { useSession } from "next-auth/react";

export default function MyMarketPanel() {
  const { setLoading } = useLoading();
  const { data: session } = useSession();
  const userID = session?.user.id;
  console.log("session", session);
  const [markets, setMarkets] = useState<Market[]>([]);

  const [searchValue, setSearchValue] = useState<MarketRequestParams>({
    market_name: "",
    address: "",
    detail: "",
    user_id: userID!!,
    limit: "10",
    offset: "0",
  });

  const fetchMarkets = useCallback(async () => {
    try {
      setLoading(true);
      const res = await marketService.getMyMarkets({
        marketRequestParams: searchValue,
      });
      setMarkets(res);
    } catch (err) {
      console.error("Failed to fetch markets:", err);
    } finally {
      setLoading(false);
    }
  }, [searchValue]);

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  return (
    <div>
      <MyMarketHeader
        onSubmit={(values) =>
          setSearchValue({
            market_name: values.search,
            address: values.search,
            detail: values.search,
            user_id: userID!!,
            limit: "10",
            offset: "0",
          })
        }
      />

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {markets.map((market) => (
          <MarketCard market={market} key={market.id} detailPath="my-market" />
        ))}
      </div>
    </div>
  );
}
