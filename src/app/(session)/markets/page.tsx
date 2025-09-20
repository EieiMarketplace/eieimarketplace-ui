"use client";

import { useEffect, useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Market } from "@/shared/interface";
import { useRouter } from "next/navigation";
import MarketHeader from "@/components/Market/market-header/ui";
import MarketPanel from "@/components/Market/market-panel/ui";

export default function MarketListPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <MarketPanel />
    </div>
  );
}
