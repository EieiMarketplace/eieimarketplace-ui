import { patchReservation } from "@/services/patchReservation";
import { ButtonProps } from "./button";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FormDataLog, FormSchema } from "../ui";

const LoadingOverlay = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-100 backdrop-blur-sm">
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-2xl">
      <div className="w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full border-t-gray-800 animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-gray-800">Loading...</p>
    </div>
  </div>
);

export default function OrganizerButtonPart({
  Button,
}: {
  Button: ButtonProps;
}) {
  const params = useParams();
  const reservationId = params?.id as string;

  const router = useRouter(); // Initialize the router

  const { data: session } = useSession();
  const token = session?.user.token ?? "";

  const { role, status, form, reservationData } = Button;

  // State to manage the loading status of the buttons
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormSchema) => {
    const logName = data.log;
    console.log(logName);
    if (!logName) return;
    await Request("APPLICATION", "WAITFORPAY", logName);
    console.log("Selected Log:", logName);
  };

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

  return (
    <>
      {/* Conditional Rendering of the Loading Overlay */}
      {isLoading && <LoadingOverlay />}

      {status === "APPLICATION" && (
        <div className="flex justify-between mt-4 w-full">
          <button
            type="button"
            className="px-5 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-500 transition"
            onClick={() => Request("APPLICATION", "RETIRE")}
            style={{ cursor: "pointer" }}
            disabled={isLoading}
          >
            Reject
          </button>
          <button
            type="button"
            className="px-5 py-2 rounded-md bg-gray-800 text-white text-sm hover:bg-gray-700 transition"
            onClick={() => onSubmit(form.getValues())}
            style={{ cursor: "pointer" }}
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
      )}

      {status === "WAITFORPAY" && (
        <button
          type="button"
          className="px-5 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-500 transition"
          onClick={() =>
            Request("WAITFORPAY", "RETIRE", reservationData.Log[0].name)
          }
          style={{ cursor: "pointer" }}
          disabled={isLoading} // Added disabled prop
        >
          Reject
        </button>
      )}

      {status === "VALIDATESLIP" && (
        <button
          type="button"
          className="px-5 py-2 rounded-md bg-green-600 text-white text-sm hover:bg-green-500 transition"
          onClick={() => Request("VALIDATESLIP", "MERCHANT")}
          style={{ cursor: "pointer" }}
          disabled={isLoading} // Added disabled prop
        >
          Approve
        </button>
      )}

      {status === "MERCHANT" && (
        <button
          type="button"
          className="px-5 py-2 rounded-md bg-gray-800 text-white text-sm hover:bg-gray-700 transition"
          onClick={() => Request("MERCHANT", "WAITFORPAY")}
          style={{ cursor: "pointer" }}
          disabled={isLoading} // Added disabled prop
        >
          Send New Invoice
        </button>
      )}
    </>
  );
}
