"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMarketService } from "@/services/createMarket";
import { useEffect } from "react";
import { getMarketFromId } from "@/services/getMarketFromId";
import { editMarketService } from "@/services/editMarket";
import { useSession } from "next-auth/react";
import {
  MarketCreateRequest,
  MarketLog,
  MarketPlanKey,
} from "@/shared/interface";
import ImageCard from "@/components/Market/image-card/ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CreateAndEditMarketPanelProps {
  editMode: string;
  Id: string;
}

export default function CreateAndEditMarketPanel({
  editMode,
  Id,
}: CreateAndEditMarketPanelProps) {
  const [formData, setFormData] = useState<MarketCreateRequest>({
    id: "",
    marketName: "",
    address: "",
    coverImageKey: "",
    detail: "",
    rule: "",
    coverImageUrl: "",
    marketPlanKeys: [],
    newCoverImageFile: null as File | null,
    // marketPlanImageFiles: [] as File[],
    logs: [],
    userid: "",
  });
  const { data: session } = useSession();
  const userID = session?.user.id;
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  useEffect(() => {
    if (editMode === "Edit" && Id !== "") {
      (async () => {
        try {
          const market = await getMarketFromId(Id);
          setFormData({
            marketName: market.marketName || "",
            address: market.address || "",
            detail: market.detail || "",
            rule: market.rule || "",
            coverImageKey: market.coverImageKey,
            marketPlanKeys: [],
            logs: market.logs || [],
            userid: market.userid,
            coverImageUrl: market.coverImageUrl,
          });
        } catch (error) {
          console.error("Failed to fetch market data:", error);
        }
      })();
    }
  }, [editMode, Id]);

  function createMarketFormData(marketData: MarketCreateRequest): FormData {
    const formData = new FormData();

    if (marketData.newCoverImageFile) {
      formData.append("coverImageFile", marketData.newCoverImageFile);
    }

    if (marketData.marketPlanKeys && marketData.marketPlanKeys.length > 0) {
      marketData.marketPlanKeys.forEach((eachPlan, index) => {
        if (eachPlan.marketPlanImageFile) {
          console.log("hello");
          formData.append(`marketPlanImageFiles`, eachPlan.marketPlanImageFile);
        }
      });
    }
    formData.append("marketName", marketData.marketName);
    formData.append("address", marketData.address);
    formData.append("coverImageKey", marketData.coverImageKey);
    formData.append("detail", marketData.detail);
    formData.append("rule", marketData.rule);
    formData.append("userid", marketData.userid);
    formData.append("logs", JSON.stringify(marketData.logs));
    return formData;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "newCoverImageFile" | "marketPlanImageFiles"
  ) => {
    if (!e.target.files) return;
    if (field === "newCoverImageFile") {
      setFormData((prev) => ({
        ...prev,
        newCoverImageFile: e.target.files?.[0] || null,
        coverImageUrl:
          e.target.files && e.target.files[0]
            ? URL.createObjectURL(e.target.files[0])
            : "",
      }));
    } else if (field === "marketPlanImageFiles") {
      const newMarketPlanKeys: MarketPlanKey[] = Array.from(e.target.files).map(
        (file, index) => ({
          marketPlanKey: "",
          marketPlanImageUrl: URL.createObjectURL(file),
          marketPlanImageFile: file,
        })
      );

      setFormData((prev) => ({
        ...prev,
        marketPlanKeys: [...(prev.marketPlanKeys || []), ...newMarketPlanKeys],
      }));
    }
  };

  const handleDeleteCoverImage = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      newCoverImageFile: null,
      coverImageUrl: "",
    }));
  };

  const handleDeleteMarketImageKey = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      marketPlanKeys:
        prev.marketPlanKeys?.filter(
          (eachPlanKey) => eachPlanKey.marketPlanImageUrl !== imageUrl
        ) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: MarketCreateRequest = {
      marketName: formData.marketName,
      address: formData.address,
      coverImageKey: formData.coverImageKey,
      marketPlanKeys: formData.marketPlanKeys,
      logs: formData.logs.map((log: MarketLog) => ({
        size: log.size,
        price: log.price,
        user_id: log.user_id,
        reservation_id: 0,
      })),

      detail: formData.detail,
      rule: formData.rule,
      userid: userID?.toString()!!,
      newCoverImageFile: formData.newCoverImageFile,
      // marketPlanImageFiles: formData.marketPlanImageFiles,
    };
    // console.log(payload);

    const request: FormData = createMarketFormData(payload);
    // console.log("Req", request);
    if (editMode === "Create") {
      try {
        await createMarketService(request);
        setPopupMessage("Create market successfully");
      } catch (error) {
        console.error(error);
        setPopupMessage("Fail to create a market");
      }
    } else {
      try {
        await editMarketService(payload);
        setPopupMessage("Edit Market Successfully");
      } catch (error) {
        console.error(error);
        setPopupMessage("Fail to edit a market");
      }
    }
  };

  function OnPopUpClick(): void {
    setPopupMessage(null);
    // window.location.href = "/my-market/" + Id;
  }

  const updateLog = (index: number, field: "size" | "price", value: string) => {
    setFormData((prev) => {
      const newLogs = [...prev.logs];
      if (field === "price") {
        newLogs[index][field] = parseFloat(value) || 0;
      } else {
        newLogs[index][field] = value;
      }
      return { ...prev, logs: newLogs };
    });
  };

  const removeLog = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      logs: prev.logs.filter((_, i) => i !== index),
    }));
  };

  const addLog = () => {
    setFormData((prev) => ({
      ...prev,
      logs: [
        ...prev.logs,
        {
          size: "",
          price: 0,
          user_id: Number(prev.userid) || 0,
          reservation_id: 0,
        },
      ],
    }));
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Create a New Market
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 h-full" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Market Name
              </label>
              <Input
                type="text"
                name="marketName"
                value={formData.marketName}
                onChange={handleChange}
                placeholder="Enter market name"
                required
                className="border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Address</label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                required
                className="border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Detail</label>
              <Textarea
                name="detail"
                value={formData.detail}
                onChange={handleChange}
                placeholder="Provide details about the market"
                rows={3}
                className="border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Rule</label>
              <Textarea
                name="rule"
                value={formData.rule}
                onChange={handleChange}
                placeholder="Enter rules for the market"
                rows={3}
                className="border border-gray-300 rounded-md"
              />
            </div>

            <div className="h-[50%]">
              <label className="block mb-1 text-sm font-medium">
                Cover Image
              </label>
              <div className="flex content-center justify-center w-full h-[300px] my-5">
                {formData.coverImageUrl ? (
                  <ImageCard
                    url={`${formData.coverImageUrl}`}
                    alt={"coverImage"}
                    handleDeleteImageAndFile={handleDeleteCoverImage}
                  />
                ) : (
                  <span className="content-center font-semibold">
                    No Cover Image
                  </span>
                )}
              </div>

              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "newCoverImageFile")}
                className="file:mr-4 file:py-2 file:px-4 
                           file:rounded-md file:border-0 
                           file:text-sm file:font-medium
                           file:bg-blue-600 file:text-white
                           cursor-pointer
                           hover:file:bg-blue-700"
              />
              {formData.newCoverImageFile && (
                <p className="text-xs text-gray-500 mt-1">
                  {formData.newCoverImageFile.name}
                </p>
              )}
            </div>

            <div className="h-[50%]">
              <label className="block mb-1 text-sm font-medium">
                Market Plan Images
              </label>
              <div className="flex content-center justify-center w-full my-5">
                {formData.marketPlanKeys &&
                formData.marketPlanKeys.length > 0 ? (
                  <div className="w-full">
                    <Carousel className="w-full">
                      <CarouselContent className="h-80">
                        {formData.marketPlanKeys.map(
                          (eachMarketPlan, index) => (
                            <CarouselItem
                              key={eachMarketPlan.marketPlanImageUrl}
                            >
                              <ImageCard
                                url={`${eachMarketPlan.marketPlanImageUrl}`}
                                alt={`${eachMarketPlan.marketPlanImageUrl}`}
                                handleDeleteImageAndFile={
                                  handleDeleteMarketImageKey
                                }
                              />
                            </CarouselItem>
                          )
                        )}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                ) : (
                  <span className="content-center font-semibold">
                    No Market Plan Images
                  </span>
                )}
              </div>
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
              {formData.marketPlanKeys &&
                formData.marketPlanKeys.length > 0 && (
                  <ul className="text-xs text-gray-500 mt-1 space-y-1">
                    {/* {formData.marketPlanKeys.map((eachMarketPlan, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <span>{eachMarketPlan.marketPlanImageFile.name}</span>
                        <span className="text-gray-400">
                          ({(eachMarketPlan.marketPlanImageFile.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </li>
                    ))} */}
                  </ul>
                )}
            </div>

            {/* 👇 Logs Section */}
            <div>
              <label className="block mb-2 text-sm font-medium">Logs</label>
              {formData.logs.map((log, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 items-center mb-2 border p-3 rounded-md"
                >
                  <div className="col-span-5">
                    <label className="block text-xs font-medium mb-1">
                      Size
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., 2x3, M, 10sqm"
                      value={log.size}
                      onChange={(e) => updateLog(index, "size", e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-span-5">
                    <label className="block text-xs font-medium mb-1">
                      Price
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter price"
                      value={log.price}
                      onChange={(e) =>
                        updateLog(index, "price", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-span-2 flex justify-end">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeLog(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={addLog}
                className="mt-2 w-full bg-green-600 text-white"
              >
                + Add Log
              </Button>
            </div>

            <Button type="submit" className="w-full">
              {editMode} Market
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Popup Message */}
      {popupMessage && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4 w-80">
            <p className="text-lg font-medium">{popupMessage}</p>
            <Button onClick={() => OnPopUpClick()}>Continue</Button>
          </div>
        </div>
      )}
    </div>
  );
}
