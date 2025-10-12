import { patchReservation } from "@/services/patchReservation";
import { ButtonProps } from "./button";
import { useParams, useRouter } from "next/navigation"; // Import useRouter
import { useSession } from "next-auth/react";
import { useState } from "react"; // Import useState

export default function VendorButtonPart({
  Button,
}: {
  Button: ButtonProps;
}) {
  const params = useParams();
  const reservationId = params?.id as string;
  const router = useRouter(); // Initialize the router

  // State to manage the loading status of the buttons
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const token = session?.user.token!;

  const { role, status, form, reservationData } = Button;

  const Request = async (Curr: string, Prev: string, logName?: string) => {
      try{
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
        }  finally {
          setIsLoading(false); 
        }
    };

  const onRetire = async () => {
    setIsLoading(true); // Start loading
    try {
      const res = await patchReservation(
        reservationData.marketID,
        "WAITFORPAY",
        "RETIRE",
        reservationData.vendorId,
        reservationId,
        token
      );
      console.log("Patch successful:", res);
      router.refresh();
    } catch (error) {
      console.error("Failed to patch reservation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRequest = () => {
    // This function can also have its own async logic and loading state
    console.log("To Request");
  };

  return (
    <>
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
            onClick={() => Request("WAITFORPAY", "VALIDATESLIP")}
            disabled={isLoading} 
          >
            Request
          </button>
        </div>
      )}
    </>
  );
}