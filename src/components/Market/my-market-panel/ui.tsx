"use client";
import { useCallback, useEffect, useState } from "react";
import { Market, MarketRequestParams, MarketResponse } from "@/shared/interface";
import { MarketCard } from "../market-card/ui";
import { marketService } from "@/services/market";
import MyMarketHeader from "../mymarket-header/ui";
import { useLoading } from "@/shared/context/Loading";
import { useSession } from "next-auth/react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function MyMarketPanel() {
  const { setLoading } = useLoading();
  const { data: session } = useSession();
  const userID = session?.user.id;

  const [markets, setMarkets] = useState<Market[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const [searchValue, setSearchValue] = useState<MarketRequestParams>({
    market_name: "",
    address: "",
    detail: "",
    user_id: userID!,
    limit: "10",
    offset: "0",
  });

  const fetchMarkets = useCallback(async () => {
    try {
      setLoading(true);
      const res: MarketResponse = await marketService.getMyMarkets({
        marketRequestParams: {
          ...searchValue,
          offset: ((page - 1) * 10).toString(),
        },
      });

      setMarkets(res.market);
      setTotalCount(res.total_count);
    } catch (err) {
      console.error("Failed to fetch markets:", err);
    } finally {
      setLoading(false);
    }
  }, [searchValue, page]);

  useEffect(() => {
    console.log("Page", page);
    fetchMarkets();
  }, [fetchMarkets]);

  const totalPages = Math.round(totalCount / 10);
  return (
    <div className="flex flex-col h-full w-full">
      <MyMarketHeader
        onSubmit={(values) =>
          setSearchValue({
            market_name: values.search,
            address: values.search,
            detail: values.search,
            user_id: userID!,
            limit: "10",
            offset: ((page - 1) * 10).toString(),
          })
        }
      />

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
        {markets.map((market) => (
          <MarketCard market={market} key={market.id} detailPath="my-market" />
        ))}
      </div>

      {totalPages >= 0 && (
        <Pagination>
          <PaginationContent>
            {/* Prev */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => page > 1 && setPage(page - 1)}
              />
            </PaginationItem>

            {/* Always show first page if not on page 1 */}
            {page > 2 && (
              <>
                <PaginationItem key="first">
                  <PaginationLink href="#" onClick={() => setPage(1)}>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem key="start-ellipsis">
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            {/* Previous page */}
            {page > 1 && (
              <PaginationItem key={page - 1}>
                <PaginationLink href="#" onClick={() => setPage(page - 1)}>
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Current page */}
            <PaginationItem key={page}>
              <PaginationLink href="#" isActive>
                {page}
              </PaginationLink>
            </PaginationItem>

            {/* Next page */}
            {page < totalPages && (
              <PaginationItem key={page + 1}>
                <PaginationLink href="#" onClick={() => setPage(page + 1)}>
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Show ellipsis + last page */}
            {page + 1 < totalPages && (
              <>
                <PaginationItem key="end-ellipsis">
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem key="last">
                  <PaginationLink href="#" onClick={() => setPage(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => page < totalPages && setPage(page + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
