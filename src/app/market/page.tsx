"use client"

import { useEffect, useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Market } from "@/shared/interface";
import { useRouter } from "next/navigation";

export default function MarketListPage() {
  const [search, setSearch] = useState("");
  const [markets, setMarkets] = useState<Market[]>([]);
  const router = useRouter();
  const notfound = "N/A"

  useEffect(() => {
    fetch("http://localhost:7002/markets")
      .then((res) => res.json())
      .then((data: Market[]) => setMarkets(data))
      .catch((err) => console.error("Failed to fetch markets:", err));
  }, []);

  const filteredMarkets = markets.filter((m) =>
    m.marketName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-gray-200 p-4 border-b">
        <div className="flex gap-2">
          <Button variant="outline">Home</Button>
          <Button variant="outline">Market</Button>
          <Button variant="outline">My Reservation</Button>
        </div>
        <div className="font-medium">myName</div>
      </div>

      {/* Title */}
      <div className="p-6">
        <h1 className="text-2xl font-bold">All Market Lists</h1>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-2 px-6">
        <div className="flex items-center border rounded-lg bg-white px-2 w-72">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-2 py-2 outline-none text-sm "
          />
        </div>
        <Button className="bg-indigo-500 hover:bg-indigo-600">Search</Button>
        <Button variant="secondary">Filter</Button>
      </div>

      {/* Market List */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMarkets.map((market) => (
          <Card key={market.id} className="!py-0 !space-y-0 !gap-0 overflow-hidden shadow-lg cursor-pointer">
            <img
              src={market.coverImageKey || "./images/Taiwan.jpg"}
              alt={market.marketName || notfound}
              onClick={() => router.push(`/market/${market.id}`)}
              className="w-full h-[50%] object-cover"
            />
            <div className="bg-green-600 text-white p-4 font-semibold text-xl">
              {market.marketName || notfound}
            </div>
            <CardContent className="text-sm">
              <div className="flex items-center gap-1 text-gray-700 py-3 font-semibold">
                <MapPin/>
                {market.address || notfound}
              </div>
              <p className="mt-2 text-gray-600">{market.detail || notfound}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination placeholder */}
      <div className="flex justify-center items-center gap-2 pb-6">
        <Button variant="outline" size="sm">1</Button>
        <Button variant="ghost" size="sm">2</Button>
        <span className="text-gray-500">...</span>
        <Button variant="ghost" size="sm">9</Button>
        <Button variant="ghost" size="sm">10</Button>
      </div>
    </div>
  );
}
