"use client";

import { ReservationDetail } from "@/shared/interface";
import { useSession } from "next-auth/react";
import { Form } from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import LogPart from "./log";
import SlipPart from "./slip";
import ReservationSlipPart from "../ReservationSlipPart/ui";
import { useState } from "react";
import ButtonPart from "./Button/button";

const formSchemaApplication = z.object({
  log: z.string().nonempty("Please select a log for vendor"),
});

export type FormSchema = z.infer<typeof formSchemaApplication>;

export type FormDataLog = UseFormReturn<FormSchema>;

export default function ReservationDataPart({
  reservationData,
}: {
  reservationData: ReservationDetail;
}) {
  const { data: session } = useSession();
  const [newSlip, setNewSlip] = useState<File | null | undefined>();
  const role = session?.user.role;

  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case "MERCHANT":
        return "text-green-600 bg-green-50";
      case "WAITFORPAY":
      case "VALIDATESLIP":
        return "text-yellow-600 bg-yellow-50";
      case "RETIRE":
        return "text-red-600 bg-red-50";
      default:
        return "text-blue-600 bg-blue-50";
    }
  };

  // Explicitly type slipImageKeys to avoid implicit any[]
  const slipImageKeys: { marketPlanImageUrl: string }[] = [];

  // const formSchemaApplication = z.object({
  //   log: z.string().nonempty("Please select a log for vendor"),
  // });

  const form = useForm<z.infer<typeof formSchemaApplication>>({
    resolver: zodResolver(formSchemaApplication),
    defaultValues: { log: "" },
  });

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 py-10">
      <div className="w-full max-w-3xl bg-white rounded-xl border border-gray-100 shadow-sm p-10">
        <Form {...form}>
          <form className="flex flex-col space-y-6 text-base text-gray-800">
            <h2 className="text-2xl font-semibold text-gray-900">
              Reservation Information
            </h2>

            {/* Vendor Name */}
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm mb-1">Vendor Name</span>
              <span className="font-medium">{reservationData.vendorName}</span>
            </div>

            {/* Reservation Time */}
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm mb-1">
                Reservation Time
              </span>
              <span className="font-medium text-gray-700">In Progress</span>
            </div>

            {/* Reservation Detail */}
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm mb-1">
                Reservation Detail
              </span>
              <span className="font-medium">
                {reservationData.reservationDetail}
              </span>
            </div>

            {/* Reservation Status */}
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm mb-1">
                Reservation Status
              </span>
              <span
                className={`inline-block self-start px-3 py-1 mt-1 rounded-md text-sm font-semibold ${getStatusStyle(
                  reservationData.vendorReservationStatus
                )}`}
              >
                {reservationData.vendorReservationStatus}
              </span>
            </div>

            {/* Logs Section */}
            <LogPart
              LogProps={{
                role: role || "",
                status: reservationData.vendorReservationStatus,
                logs: reservationData.Log,
                form,
              }}
            />

            {/* Reservation Detail */}
            <SlipPart
              SlipProps={{
                role: role || "",
                status: reservationData.vendorReservationStatus,
                newSlip,
                setNewSlip,
              }}
            />

            {/*Button*/}
            <ButtonPart
              Button={{
                role: role || "",
                status: reservationData.vendorReservationStatus,
                form: form,
                reservationData: reservationData,
                newSlip: newSlip,
              }}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
