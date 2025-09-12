"use client";

import TextWithRedirect from "../TextWithRedirect";

import { useSession } from "next-auth/react";

export default function NavigationBar() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div className="h-[50px] bg-[#D9D9D9] w-full rounded-md flex flex-row">
      <div className="content-center justify-between space-x-5">
        <TextWithRedirect text="Home" url="/home" />
        <TextWithRedirect text="Markets" url="/markets" />

        {session?.user?.role === "organizor" && (
          <TextWithRedirect text="My Markets" url="/my-market" />
        )}

        {session?.user?.role === "vendor" && (
          <TextWithRedirect text="Vendor Dashboard" url="/vendor-dashboard" />
        )}
      </div>
      <div className="content-center ml-auto">
        <span className="text-center text-xl font-semibold cursor-pointer hover:underline">
          {session ? (
            session.user.email
          ) : (
            <TextWithRedirect text="Login" url="/auth/login" />
          )}
        </span>
      </div>
    </div>
  );
}
