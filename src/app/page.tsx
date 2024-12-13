import Myform from "@/components/Myform";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="main p-4">
      <h2 className="main-header text-center text-2xl font-bold">
        React Crud Operations
      </h2>
      <Myform />
      <Toaster />
    </div>
  );
}
