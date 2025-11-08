"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLoading } from "@/shared/context/Loading";
import { updateUserInfo } from "@/shared/slice/userInfoSlice";
import { useAppDispatch } from "@/shared/hook";
import { userInfoService } from "@/services/getUserInfo";

export default function LoginPanel() {
  const router = useRouter();
  const { setLoading } = useLoading();

  const dispatch = useAppDispatch();

  const formSchema = z.object({
    email: z.string(),
    password: z.string(),
  });
  // .refine(
  //   async (data) => {
  //     const result = await signIn("credentials", {
  //       email: data.email,
  //       password: data.password,
  //       redirect: false,
  //       callbackUrl: "/",
  //     });
  //     if (result?.error) {
  //       return false;
  //     }
  //     return true;
  //   },
  //   {
  //     error: "Username or password is incorrect",
  //     path: ["password", "email"],
  //   }
  // );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error && result.error == "CredentialsSignin") {
        form.setError("email", {
          message: "Username or password is incorrect",
        });
        form.setError("password", {
          message: "Username or password is incorrect",
        });
      } else {
        const userInfoData = await userInfoService.getUserInfo();
        console.log("userData", userInfoData);
        dispatch(updateUserInfo(userInfoData));
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-[800px] h-full content-center justify-center items-center p-10 bg-[#D9D9D9] shadow-xl rouded-md">
      <h1 className="text-center font-semibold text-[24px] mb-10">
        Eiei Market Place
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8 flex flex-col items-center"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input
                    className="w-[500px] bg-white shadow-xl rounded-md"
                    placeholder="email@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="w-[500px] bg-white shadow-xl rounded-md"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button
            className="text-xl shadow-xl rounded-md bg-[#8A96FD] p-5 w-[30%] font-semibold text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#8A96FD] hover:border hover:border-[#8A96FD] hover:cursor-pointer flex !mb-5"
            type="submit"
          >
            Login
          </Button>
          <h1
            className="text-base font-semibold underline hover:cursor-pointer mt hover:text-[#8A96FD]"
            onClick={() => router.push("/auth/register")}
          >
            Register
          </h1>
        </form>
      </Form>
    </div>
  );
}
