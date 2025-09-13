import MainPagePanel from "@/components/MainPagePanel/ui";
import NavigationBar from "@/components/NavigationBar/ui";
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <MainPagePanel />
    </div>
  );
}
