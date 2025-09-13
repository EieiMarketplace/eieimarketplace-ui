// src/app/page.tsx
import NavigationBar from "@/components/NavigationBar/ui";
import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to login page by default
  // redirect("/auth/login");
  return (
    <div>
      <NavigationBar />
    </div>
  );
}
