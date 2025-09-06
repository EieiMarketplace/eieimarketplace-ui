"use client";
import { signIn } from "next-auth/react";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const router = useRouter();
  const email = useRef("");
  const pass = useRef("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      email: email.current,
      password: pass.current,
      redirect: false,
      callbackUrl: "/",
    });

    if (result?.error) {
      console.error("Login failed:", result.error);
    } else {
      router.push("/home");
    }
  };
  return (
    <div>
      <div>
        <Input
          className="text-black"
          placeholder="email"
          onChange={(e) => (email.current = e.target.value)}
        />
        <Input
          className="text-black"
          type={"password"}
          placeholder="password"
          onChange={(e) => (pass.current = e.target.value)}
        ></Input>
        <Button onClick={onSubmit}>Login</Button>
        <span className="text-center">
          <Link className="text-black" href={"/auth/register"}>
            Register?
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
