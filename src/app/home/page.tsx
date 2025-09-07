"use client";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { userService } from "../../services/users";
import { useEffect } from "react";

export default function HomePage() {
  // const session = await getServerSession(authOptions);
  // console.log("session", session);
  const getUser = async () => {
    const response = await userService.getUsers();
    // return response;
  };
  useEffect(() => {
    getUser();
  }, [getUser]);
  return <>Hello </>;
}
