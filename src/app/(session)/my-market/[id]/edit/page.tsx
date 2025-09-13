"use client"
import CreateAndEditMarketPanel from "@/components/MarketPanel/page/CreateAndEditMarket";
import { useParams } from "next/navigation";

export default function MarketEditPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <CreateAndEditMarketPanel 
      editMode={"Edit"}
      Id={id}
    />
  );
}
