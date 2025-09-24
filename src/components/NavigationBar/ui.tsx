"use client";

import TextWithRedirect from "../TextWithRedirect";

import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useAppSelector } from "@/shared/hook";

export default function NavigationBar() {
  const { data: session, status } = useSession();
  const userInfo = useAppSelector((state) => state.userInfoSlice);
  console.log("User", userInfo);
  if (status === "loading") {
    return null;
  }
  return (
    <div className="h-[50px] bg-[#D9D9D9] w-full rounded-md flex flex-row px-2">
      <div className="content-center justify-between space-x-5">
        <TextWithRedirect text="Home" url="/" />
        <TextWithRedirect text="Markets" url="/markets" />

        {session?.user?.role === "organizer" && (
          <TextWithRedirect text="My Markets" url="/my-market" />
        )}

        {session?.user?.role === "vendor" && (
          <TextWithRedirect text="Vendor Dashboard" url="/vendor-dashboard" />
        )}
      </div>
      <div className="content-center ml-auto">
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="text-center text-xl font-semibold cursor-pointer hover:underline">
                {userInfo.userInfo.email}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                      {"Logout"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Would you like to Logout?</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button onClick={() => signOut()}>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <TextWithRedirect text="Login" url="/auth/login" />
        )}
      </div>
    </div>
  );
}
