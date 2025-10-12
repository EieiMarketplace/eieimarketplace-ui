import { patchReservation } from "@/services/patchReservation";
import { ButtonProps } from "./button";
import { useParams, useRouter } from "next/navigation"; // Import useRouter
import { useSession } from "next-auth/react";
import { useState } from "react"; // Import useState
import { slipService } from "@/services/slips";

export default function VendorButtonPart({ Button }: { Button: ButtonProps }) {
  const LoadingOverlay = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-100 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-2xl">
        <div className="w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full border-t-gray-800 animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-gray-800">Loading...</p>
      </div>
    </div>
  );

  const params = useParams();
  const reservationId = params?.id as string;
  const router = useRouter(); // Initialize the router

  // State to manage the loading status of the buttons
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const token = session?.user.token!;

  const { role, status, form, reservationData, newSlip } = Button;

  const Request = async (Curr: string, Prev: string, logName?: string) => {
    try {
      setIsLoading(true);
      const res = await patchReservation(
        reservationData.marketID,
        Curr,
        Prev,
        reservationData.vendorId,
        reservationId,
        token,
        logName
      );
      console.log("Patch successful:", res);
      window.location.reload();
    } catch (error) {
      console.error("Failed to patch reservation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendCreateSlip = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      console.log("slip", newSlip);
      if (newSlip) {
        formData.append("slipFile", newSlip);
      }
      formData.append("reservationId", reservationId);
      formData.append("marketId", reservationData.marketID);
      console.log("form", formData);
      const response = await slipService.createSlip(formData, token);
      window.location.reload();
    } catch (error) {
      console.error("Failed to patch reservation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}

      {status === "WAITFORPAY" && (
        <div className="flex justify-between mt-4 w-full">
          <button
            type="button"
            className="px-5 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={() => Request("WAITFORPAY", "RETIRE")}
            disabled={isLoading}
          >
            Retire
          </button>
          <button
            type="button"
            className="px-5 py-2 rounded-md bg-gray-800 text-white text-sm hover:bg-gray-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={() => sendCreateSlip()}
            disabled={isLoading}
          >
            Request
          </button>
        </div>
      )}
    </>
  );
}
