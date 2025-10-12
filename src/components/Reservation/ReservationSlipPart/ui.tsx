import ImageCard from "@/components/Market/image-card/ui";
import { UseFormReturn } from "react-hook-form";

export default function ReservationSlipPart({
  slipNew,
}: {
  slipNew: File | null | undefined;
}) {
  // Fetch History Slips here

  return (
    <div className="flex flex-col w-full p-5 content-center">
      <span className="font-semibold">Slip:</span>
      <div className="h-[50%]">
        <label className="block mb-1 text-sm font-medium">Cover Image</label>
        <div className="flex content-center justify-center w-full h-[300px] my-5">
          {slipNew ? (
            <></>
          ) : (
            // <ImageCard
            //   url={`${formData.coverImageUrl}`}
            //   alt={"coverImage"}
            //   handleDeleteImageAndFile={handleDeleteCoverImage}
            // />
            <span className="content-center font-semibold">No Cover Image</span>
          )}
        </div>
      </div>
    </div>
  );
}
