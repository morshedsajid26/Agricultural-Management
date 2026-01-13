import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#0a1024] text-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">

        {/* <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} /> */}


        <main className="flex-1 overflow-y-auto bg-[#F9FAFB] p-4 md:p-6 text-white relative overflow-auto hide-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}