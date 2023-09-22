"use client";
import Sidebar from "@/components/sidebar";

import React from "react";
import "../../app/globals.css";
import Navbar from "@/components/navbar";
import { useStore } from "@/store";

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebar = useStore((state) => state.isSidebar);
  return (
    <div
      style={{ transition: "0.2s" }}
      className={`${
        isSidebar ? "dashboardLayout" : "dashboardLayoutNotSidebar"
      }`}
    >
      <Sidebar />
      <main className="">
        <Navbar />
        <div className="px-6 py-3">{children}</div>
      </main>
    </div>
  );
};

export default Dashboardlayout;
