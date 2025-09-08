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
import { useRouter } from "next/navigation";
import { useLoading } from "@/shared/context/Loading";
import { registerService } from "@/services/register";

export default function RegisterPanel() {
  const router = useRouter();
  const { setLoading } = useLoading();
  
  const formSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please use a valid Email address"),
    first_name: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name must be 1-50 characters"),
    last_name: z
      .string()
      .min(1, "Last name is required")
      .max(50, "Last name must be 1-50 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be 8-100 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one digit")
      .regex(/[!+-_=@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    confirm_password: z.string().min(1, "Please confirm your password"),
    phone_number: z
      .string()
      .min(10, "Please enter a valid phone number")
      .max(15, "Please enter a valid phone number")
      .regex(/^[0-9]{10,15}$/, "Please enter a valid phone number"),
    role: z
      .string()
      .min(1, "Please select a role")
      .refine((val) => ["vendor", "organizer"].includes(val), {
        message: "Role must be 'vendor' or 'organizer'",
      }),
  }).refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
      phone_number: "",
      role: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const result = await registerService({
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.password,
        phone_number: values.phone_number,
        role: values.role,
      });

      if (result) {
        // Registration successful
        router.push("/auth/login");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      
      // Handle specific error messages
      if (error.message?.includes("Email already registered")) {
        form.setError("email", {
          message: "This email is already registered. Try logging in instead.",
        });
      } else if (error.message?.includes("Username already used")) {
        form.setError("first_name", {
          message: "This username is already taken. Please choose another.",
        });
      } else if (error.message?.includes("Phone number")) {
        form.setError("phone_number", {
          message: "Please enter a valid phone number.",
        });
      } else {
        // Generic error
        form.setError("root", {
          message: "Registration failed. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-[800px] h-full content-center justify-center items-center p-10 bg-[#D9D9D9] shadow-xl rounded-md">
      <h1 className="text-center font-semibold text-[24px] mb-10">
        Register - Eiei Market Place
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 flex flex-col items-center"
        >
          {/* Email Field */}
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
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* First Name Field */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name:</FormLabel>
                <FormControl>
                  <Input
                    className="w-[500px] bg-white shadow-xl rounded-md"
                    placeholder="Enter your first name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name Field */}
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name:</FormLabel>
                <FormControl>
                  <Input
                    className="w-[500px] bg-white shadow-xl rounded-md"
                    placeholder="Enter your last name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
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
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password:</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="w-[500px] bg-white shadow-xl rounded-md"
                    placeholder="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number Field */}
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number:</FormLabel>
                <FormControl>
                  <Input
                    className="w-[500px] bg-white shadow-xl rounded-md"
                    placeholder="Enter your phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role Field */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role:</FormLabel>
                <FormControl>
                  <select
                    className="w-[500px] h-10 px-3 py-2 bg-white shadow-xl rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8A96FD]"
                    {...field}
                  >
                    <option value="">Select your role</option>
                    <option value="vendor">Vendor</option>
                    <option value="organizer">Organizer</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Root Error Message */}
          {form.formState.errors.root && (
            <div className="text-red-500 text-sm">
              {form.formState.errors.root.message}
            </div>
          )}

          {/* Submit Button */}
          <Button
            className="text-xl shadow-xl rounded-md bg-[#8A96FD] p-5 w-[30%] font-semibold text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#8A96FD] hover:border hover:border-[#8A96FD] hover:cursor-pointer flex !mb-5"
            type="submit"
          >
            Register
          </Button>

          {/* Login Link */}
          <h1
            className="text-base font-semibold underline hover:cursor-pointer hover:text-[#8A96FD]"
            onClick={() => router.push("/auth/login")}
          >
            Already have an account? Login
          </h1>
        </form>
      </Form>
    </div>
  );
}
