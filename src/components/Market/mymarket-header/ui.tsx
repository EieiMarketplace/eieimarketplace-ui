"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  search: z.string(),
});

export default function MyMarketHeader({
  onSubmit,
}: {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { search: "" },
  });
  const router = useRouter();
  return (
    <div className="p-6 space-y-2 w-full">
      <div className="flex flex-row space-x-5 pt-10">
        <h1 className="text-2xl font-bold content-center">My Market Lists</h1>
        <Button
          className="content-center text-sm shadow-xl rounded-md bg-[#5B63AC] p-6 w-[10%] font-semibold text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#5B63AC] hover:border hover:border-[#5B63AC] hover:cursor-pointer"
          variant="outline"
          onClick={() => {
            router.push("/markets/create");
          }}
        >
          <span>Create Market</span>
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="flex items-center gap-2 px-6">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      className=" bg-white shadow-xl rounded-md"
                      placeholder="Search..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="content-center text-base shadow-xl rounded-md bg-[#8A96FD] p-5 w-[10%] font-semibold text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#8A96FD] hover:border hover:border-[#8A96FD] hover:cursor-pointer"
            >
              Search
            </Button>
            <Button
              className="content-center text-base shadow-xl rounded-md bg-[#5B63AC] p-5 w-[10%] font-semibold text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#5B63AC] hover:border hover:border-[#5B63AC] hover:cursor-pointer"
              variant="outline"
            >
              Filter
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
