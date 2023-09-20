import Sidebar from "@/components/sidebar";
import React from "react";
import "../../app/globals.css";
import Navbar from "@/components/navbar";

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`dashboardContainer`}>
      <Sidebar />
      <main className="">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default Dashboardlayout;
