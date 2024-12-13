import Create from "@/components/Create";
import Read from "@/components/Read";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function Home() {
  return (
    <div className="main p-4">
      <h2 className="main-header text-center text-2xl font-bold">
        React Crud Operations
      </h2>
      <Create />
      <Read />
    </div>
  );
}
