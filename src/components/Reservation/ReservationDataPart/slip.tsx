import ImageCard from "@/components/Market/image-card/ui";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";

interface SlipProps {
    role: string;
    status: string;
    slipImageKeys?: { ImageUrl: string }[];
}

export default function SlipPart({
  SlipProps
}: {
  SlipProps: SlipProps;
}){
    const { role, status, slipImageKeys } = SlipProps;

      const handleFileChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      field: "newCoverImageFile" | "marketPlanImageFiles"
    ) => {
      if (!e.target.files) return;
      // if (field === "newCoverImageFile") {
      //   setFormData((prev) => ({
      //     ...prev,
      //     newCoverImageFile: e.target.files?.[0] || null,
      //     coverImageUrl:
      //       e.target.files && e.target.files[0]
      //         ? URL.createObjectURL(e.target.files[0])
      //         : "",
      //   }));
      // } else if (field === "marketPlanImageFiles") {
      //   const newMarketPlanKeys: MarketPlanKey[] = Array.from(e.target.files).map(
      //     (file, _) => ({
      //       marketPlanKey: "",
      //       marketPlanImageUrl: URL.createObjectURL(file),
      //       marketPlanImageFile: file,
      //     })
      //   );
  
      //   setFormData((prev) => ({
      //     ...prev,
      //     marketPlanKeys: [...(prev.marketPlanKeys || []), ...newMarketPlanKeys],
      //   }));
      // }
    };

    const handleDeleteMarketImageKey = (imageUrl: string) => {
      // setFormData((prev) => {
      //   // Find the plan key of the image to delete
      //   const deletedKeys: string[] =
      //     prev.marketPlanKeys
      //       ?.filter((plan) => plan.marketPlanImageUrl === imageUrl)
      //       .map((plan) => plan.marketPlanKey) || [];

      //   return {
      //     ...prev,
      //     // Remove the plan from marketPlanKeys
      //     marketPlanKeys:
      //       prev.marketPlanKeys?.filter(
      //         (plan) => plan.marketPlanImageUrl !== imageUrl
      //       ) || [],
      //     // Append deleted keys to deletedKey array
      //     deletedMarketKeys: [...(prev.deletedMarketKeys || []), ...deletedKeys],
      //   };
      // });
  };
    
    return (
        <div className="flex flex-col">
              <span className="text-gray-500 text-sm mb-1">
                Slip
              </span>
              <div className="h-full">
                <div className="flex content-center justify-center w-full my-5">
                  {slipImageKeys &&
                  slipImageKeys.length > 0 ? (
                    <div className="w-full">
                      <Carousel className="w-full">
                        <CarouselContent className="h-80">
                          {slipImageKeys.map((eachMarketPlan, _) => (
                            <CarouselItem key={eachMarketPlan.ImageUrl}>
                              <ImageCard
                                url={`${eachMarketPlan.ImageUrl}`}
                                alt={`${eachMarketPlan.ImageUrl}`}
                                handleDeleteImageAndFile={
                                  handleDeleteMarketImageKey
                                }
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </div>
                  ) : (
                    <span className="content-center font-semibold">
                      No Slip Image.
                    </span>
                  )}
                </div>
                {role === "vendor" && status === "WAITFORPAY" ? (
                   <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, "marketPlanImageFiles")}
                    className="file:mr-4 file:py-2 file:px-4 
                                file:rounded-md file:border-0 
                                file:text-sm file:font-medium
                                file:bg-blue-600 file:text-white file:items-center file:content-center
                                items-center
                                cursor-pointer
                                hover:file:bg-blue-700 hover:file:cursor-ponter"
                    /> 
                ) : <></>}
                
              </div>
            </div>
    );
}