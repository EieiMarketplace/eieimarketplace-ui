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

interface CreateAndEditMarketPanelProps {
  editMode: string;
  Id: string;
}

export default function CreateAndEditMarketPanel({
  editMode,
  Id,
}: CreateAndEditMarketPanelProps) {
  const [formData, setFormData] = useState({
    marketName: "",
    address: "",
    detail: "",
    rule: "",
    coverImageKey: null as File | null,
    marketPlanKeys: [] as File[],
  });
  const { data: session } = useSession();
  const userID = session?.user.id;

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
            coverImageKey: null,
            marketPlanKeys: [],
          });
        } catch (error) {
          console.error("Failed to fetch market data:", error);
        }
      })();
    }
  }, [editMode, Id]);

  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "coverImageKey" | "marketPlanKeys"
  ) => {
    if (!e.target.files) return;
    if (field === "coverImageKey") {
      setFormData((prev) => ({
        ...prev,
        coverImageKey: e.target.files?.[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        marketPlanKeys: Array.from(e.target.files || []),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      id: Id,
      marketName: formData.marketName,
      address: formData.address,
      coverImageKey: formData.coverImageKey?.name || "",
      marketPlanKeys: formData.marketPlanKeys.map((f) => f.name),
      logs: [],
      detail: formData.detail,
      rule: formData.rule,
      userid: userID?.toString()!!,
    };

    if (editMode === "Create") {
      try {
        await createMarketService(payload);
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
    window.location.href = "/my-market/" + Id;
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Create a New Market
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
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

            <div>
              <label className="block mb-1 text-sm font-medium">
                Cover Image
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "coverImageKey")}
                className="file:mr-4 file:py-2 file:px-4 
                           file:rounded-md file:border-0 
                           file:text-sm file:font-medium
                           file:bg-blue-600 file:text-white
                           hover:file:bg-blue-700"
              />
              {formData.coverImageKey && (
                <p className="text-xs text-gray-500 mt-1">
                  {formData.coverImageKey.name}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Market Plan Images
              </label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, "marketPlanKeys")}
                className="file:mr-4 file:py-2 file:px-4 
                           file:rounded-md file:border-0 
                           file:text-sm file:font-medium
                           file:bg-blue-600 file:text-white
                           hover:file:bg-blue-700"
              />
              {formData.marketPlanKeys.length > 0 && (
                <ul className="text-xs text-gray-500 mt-1 space-y-1">
                  {formData.marketPlanKeys.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                </ul>
              )}
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
