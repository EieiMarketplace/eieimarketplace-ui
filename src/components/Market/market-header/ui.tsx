import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function MarketHeader({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-bold">All Market Lists</h1>
      <div className="flex items-center gap-2 px-6">
        <div className="flex items-center border rounded-lg bg-white px-2 w-full">
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
    </div>
  );
}
