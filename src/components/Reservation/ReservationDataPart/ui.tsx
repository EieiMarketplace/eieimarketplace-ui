import { ReservationStatus } from "@/shared/enum";
import ReservationLog from "../ReservationLog/ui";
import { MarketLog, ReservationDetail } from "@/shared/interface";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export default function ReservationDataPart({
  reservationData,
}: {
  reservationData: ReservationDetail;
}) {
  const { data: session } = useSession();
  //   const log: MarketLog[] = [{ name: "hello", price: 500, size: "size" }];
  const role = session?.user.role;
  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case "MERCHANT":
        return "bg-green-100 text-green-700 border-green-500";
      case "WAITFORPAY":
        return "bg-yellow-100 text-yellow-700 border-yellow-500";
      case "VALIDATESLIP":
        return "bg-yellow-100 text-yellow-700 border-yellow-500";
      case "RETIRE":
        return "bg-red-100 text-red-700 border-red-500";
      default:
        return "bg-blue-100 text-blue-700 border-blue-300";
    }
  };
  const formSchemaApplication = z.object({
    log: z.string("Please Select Log for Vendor"),
  });

  const form1 = useForm<z.infer<typeof formSchemaApplication>>({
    resolver: zodResolver(formSchemaApplication),
    defaultValues: {
      log: "",
    },
  });

  const formProps =
    reservationData.vendorReservationStatus === ReservationStatus.APPLICATION
      ? form1
      : form1;

  const onSubmit = () => {};

  return (
    <div className="w-full  ">
      <Form {...formProps}>
        <form
          onSubmit={form1.handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <div className="flex-row">
            <span className="font-semibold mr-1">{"Vendor Name: "}</span>
            <span>{reservationData.vendorName}</span>
          </div>
          <div className="flex-row">
            <span className="font-semibold mr-1">{"Reservation Time: "}</span>
            <span>In Problem Now</span>
          </div>
          <div className="flex-row">
            <span className="font-semibold mr-1">{"Reservation Detail: "}</span>
            <span>{reservationData.reservationDetail}</span>
          </div>
          <div className="flex-row">
            <span className="font-semibold mr-1">{"Reservation Status: "}</span>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full border ${getStatusStyle(
                reservationData.vendorReservationStatus
              )}`}
            >
              {reservationData.vendorReservationStatus}
            </span>
          </div>
          <div className=" ">
            {role == "vendor" && reservationData.Log.length > 0 ? (
              reservationData.Log.map((eachLog, index) => (
                <ReservationLog key={index} log={eachLog}></ReservationLog>
              ))
            ) : role == "organizer" && reservationData.Log.length > 0 ? (
              // Select Log for vendor
              <FormField
                control={formProps.control}
                name="log"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Log:</FormLabel>
                    <FormControl>
                      <select
                        className="w-[500px] h-10 px-3 py-2 bg-white shadow-xl rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8A96FD]"
                        {...field}
                      >
                        {reservationData.Log.map((eachLog, index) => (
                          <option value={eachLog.name}>{eachLog.name}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className="flex-row">
                <span className="font-semibold mr-1">{"Log Detail: "}</span>
                <span>{"No logs are currently occupying resources."}</span>
              </div>
            )}
          </div>

          {/* Visualize Slip or Form to Upload Slip */}
          <div></div>
        </form>
      </Form>
    </div>
  );
}
