import { MarketLog } from "@/shared/interface";

export default function ReservationLog({ log }: { log: MarketLog }) {
  return (
    <div className="flex flex-col">
      <span className="font-medium">Log Detail:</span>{" "}
      <div className="flex flex-wrap gap-4 mt-2">
        <span className="flex items-center px-3 py-1 rounded-lg shadow-sm">
          <span className="font-semibold  mr-1">Name:</span>
          {log.name ?? "-"}
        </span>
        <span className="flex items-center px-3 py-1 rounded-lg shadow-sm">
          <span className="font-semibold  mr-1">Size:</span>
          {log.size ?? "-"}
        </span>
        <span className="flex items-center px-3 py-1 rounded-lg shadow-sm">
          <span className="font-semibold mr-1">Price:</span>
          {log.price ?? "-"}
        </span>
      </div>
    </div>
  );
}
