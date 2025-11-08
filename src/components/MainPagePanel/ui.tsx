"use client";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";

export default function MainPagePanel() {
  return (
    <div className="flex flex-1 flex-col justify-center items-center w-full gap-5">
      <h1 className="text-3xl font-semibold text-black   text-center">
        Welcome to Eiei Marketplace !!
      </h1>
      <Button
        className="text-xl shadow-xl rounded-md bg-[#8A96FD] p-5 w-[30%] max-w-xs font-semibold text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#8A96FD] hover:border hover:border-[#8A96FD] hover:cursor-pointer flex justify-center"
        onClick={() => {
          redirect("/markets");
        }}
      >
        Go to Market Lists
      </Button>
    </div>
  );
}
