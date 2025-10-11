import { MarketLog } from "@/shared/interface";
import ReservationLog from "../ReservationLog/ui";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface LogProps {
    role: string;
    status: string;
    logs: MarketLog[];
    form: any;
}

export default function LogPart({
  LogProps
}: {
  LogProps: LogProps;
}){
    const { role, status, logs, form } = LogProps;
    
    return (
        <div className="pt-4 border-t border-gray-100">
              {role === "organizer" && status === "APPLICATION" && logs.length > 0 ? (
                <FormField
                  control={form.control}
                  name="log"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500 text-sm">
                        Select Log for Vendor
                      </FormLabel>
                      <FormControl>
                        <select
                          className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
                          {...field}
                        >
                          <option value="">Select a log...</option>
                          {logs.map((eachLog, index) => (
                            <option key={index} value={eachLog.name}>
                              {eachLog.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : logs.length == 1? (
                <div className="space-y-4">
                  <span className="text-gray-500 text-sm">Logs</span>
                  {logs.map((eachLog, index) => (
                    <ReservationLog key={index} log={eachLog} />
                  ))}
                </div>

              ) : (
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm mb-1">Log Detail</span>
                  <span className="text-gray-600 italic">
                    You haven't been assigned a log.
                  </span>
                </div>
              )}
            </div>
    );
}