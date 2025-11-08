import ImageCard from "@/components/Market/image-card/ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { slipService } from "@/services/slips";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SlipProps {
  role: string;
  status: string;
  newSlip: File | null | undefined;
  setNewSlip: (file: File | null) => void;
}

export default function SlipPart({ SlipProps }: { SlipProps: SlipProps }) {
  const { role, status, newSlip, setNewSlip } = SlipProps;
  // TODO:Fetch List of Slip here
  const [totalSlipImages, setTotalSlipImages] = useState<string[]>([]); //TODO
  const [visualizeSlip, setVisualizeSlip] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const newUrl = URL.createObjectURL(file);
    setNewSlip(file);
    setVisualizeSlip([...totalSlipImages, newUrl]);
  };

  const params = useParams();
  const reservationId = params?.id as string;

  const fetchSlip = async () => {
    const response = await slipService.getSlips(reservationId);
    setTotalSlipImages(response.slip_urls);
    setVisualizeSlip(response.slip_urls);
  };

  useEffect(() => {
    fetchSlip();
  }, []);

  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm mb-1">Slip</span>
      <div className="h-full">
        <div className="flex content-center justify-center w-full my-5">
          {visualizeSlip.length > 0 ? (
            <div className="w-full">
              <Carousel className="w-full">
                <CarouselContent className="h-100">
                  {visualizeSlip
                    .slice()
                    .reverse()
                    .map((eachSlipImage) => (
                      <CarouselItem key={eachSlipImage}>
                        <ImageCard url={eachSlipImage} alt="Slip image" />
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          ) : (
            <span className="content-center font-semibold">No Slip Image.</span>
          )}
        </div>
        {role === "vendor" && status === "WAITFORPAY" ? (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e)}
            className="file:mr-4 file:py-2 file:px-4 
                           file:rounded-md file:border-0 
                           file:text-sm file:font-medium
                           file:bg-blue-600 file:text-white
                           cursor-pointer
                           hover:file:bg-blue-700"
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
