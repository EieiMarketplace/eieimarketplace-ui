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
    isOpen: false,
    marketType: "Market",
  });
  const { data: session } = useSession();
  const userID = session?.user.id;
  const token = session?.user.token!;
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
            marketPlanKeys: market.marketPlanKeys || [],
            logs: market.logs || [],
            deletedMarketKeys: [],
            userid: market.userid,
            coverImageUrl: market.coverImageUrl,
            isOpen: market.isOpen,
            marketType: market.marketType,
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
      // Upload new files
      marketData.marketPlanKeys.forEach((eachPlan) => {
        if (eachPlan.marketPlanImageFile) {
          formData.append("marketPlanImageFiles", eachPlan.marketPlanImageFile);
        }
      });
      // Send all keys as JSON
      const keysArray = marketData.marketPlanKeys
        .map((plan) => plan.marketPlanKey)
        .filter(Boolean);
      formData.append("marketPlanKeys", JSON.stringify(keysArray));
    }

    console.log(marketData.deletedMarketKeys);
    if (
      marketData.deletedMarketKeys &&
      marketData.deletedMarketKeys.length > 0
    ) {
      const filteredKeys = marketData.deletedMarketKeys.filter(
        (key) => key.trim() !== ""
      );
      if (filteredKeys.length > 0) {
        formData.append("deletedMarketKeys", JSON.stringify(filteredKeys));
      }
    }

    formData.append("marketName", marketData.marketName);
    formData.append("address", marketData.address);
    formData.append("coverImageKey", marketData.coverImageKey);
    formData.append("detail", marketData.detail);
    formData.append("rule", marketData.rule);
    formData.append("userid", marketData.userid);
    formData.append("logs", JSON.stringify(marketData.logs));
    formData.append("isOpen", marketData.isOpen.toString());
    formData.append("marketType", marketData.marketType);
    return formData;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
        (file, _) => ({
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

  const handleDeleteCoverImage = (_: string) => {
    setFormData((prev) => ({
      ...prev,
      newCoverImageFile: null,
      coverImageUrl: "",
    }));
  };

  const handleDeleteMarketImageKey = (imageUrl: string) => {
    setFormData((prev) => {
      // Find the plan key of the image to delete
      const deletedKeys: string[] =
        prev.marketPlanKeys
          ?.filter((plan) => plan.marketPlanImageUrl === imageUrl)
          .map((plan) => plan.marketPlanKey) || [];

      return {
        ...prev,
        // Remove the plan from marketPlanKeys
        marketPlanKeys:
          prev.marketPlanKeys?.filter(
            (plan) => plan.marketPlanImageUrl !== imageUrl
          ) || [],
        // Append deleted keys to deletedKey array
        deletedMarketKeys: [...(prev.deletedMarketKeys || []), ...deletedKeys],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: MarketCreateRequest = {
      id: Id, // make sure this is set for edit
      marketName: formData.marketName,
      address: formData.address,
      coverImageKey: formData.coverImageKey,
      marketPlanKeys: formData.marketPlanKeys,
      deletedMarketKeys: formData.deletedMarketKeys,
      logs: formData.logs.map((log: MarketLog) => ({
        name: log.name,
        size: log.size,
        price: Number(log.price),
        user_id: "", // fallback to logged-in userID
        reservation_id: "",
      })),
      detail: formData.detail,
      rule: formData.rule,
      userid: userID?.toString()!!,
      newCoverImageFile: formData.newCoverImageFile,
      isOpen: formData.isOpen || false,
      marketType: formData.marketType || "Market",
    };

    const request: FormData = createMarketFormData(payload);
    // console.log("Req", request);
    console.log([...request.entries()]);
    if (editMode === "Create") {
      try {
        await createMarketService(request, token);
        setPopupMessage("Create market successfully");
      } catch (error) {
        console.error(error);
        setPopupMessage("Fail to create a market");
      }
    } else {
      try {
        await editMarketService(Id, request, token);
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

  const updateLog = (
    index: number,
    field: "size" | "price" | "name",
    value: string
  ) => {
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
          name: "",
          size: "",
          price: 0,
          user_id: prev.userid || "",
          reservation_id: "",
        },
      ],
    }));
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {editMode} Market
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
                        {formData.marketPlanKeys.map((eachMarketPlan, _) => (
                          <CarouselItem key={eachMarketPlan.marketPlanImageUrl}>
                            <ImageCard
                              url={`${eachMarketPlan.marketPlanImageUrl}`}
                              alt={`${eachMarketPlan.marketPlanImageUrl}`}
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

            {/* Logs Section */}
            <div>
              <label className="block mb-2 text-sm font-medium">Logs</label>
              {formData.logs.map((log, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 items-center mb-2 border p-3 rounded-md"
                >
                  <div className="col-span-3">
                    <label className="block text-xs font-medium mb-1">
                      Name
                    </label>
                    <Input
                      type="text"
                      placeholder="log name..."
                      value={log.name}
                      onChange={(e) => updateLog(index, "name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-span-3">
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

                  <div className="col-span-3">
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

            {/* Type Section */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Market Type
              </label>
              <select
                name="marketType"
                value={formData.marketType}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Market">Market</option>
                <option value="Event">Event</option>
              </select>
            </div>

            {editMode == "Edit" ? (
              <div className="mt-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Market Status
                </label>
                <div
                  className="inline-flex items-center bg-gray-200 rounded-full p-1 w-max cursor-pointer select-none"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, isOpen: !prev.isOpen }))
                  }
                >
                  <span
                    className={`px-4 py-1 rounded-full font-medium text-sm transition-all ${
                      formData.isOpen
                        ? "bg-green-600 text-white"
                        : "text-gray-700"
                    }`}
                  >
                    Opened
                  </span>
                  <span
                    className={`px-4 py-1 rounded-full font-medium text-sm transition-all ${
                      !formData.isOpen
                        ? "bg-red-600 text-white"
                        : "text-gray-700"
                    }`}
                  >
                    Closed
                  </span>
                </div>
              </div>
            ) : (
              <></>
            )}

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
