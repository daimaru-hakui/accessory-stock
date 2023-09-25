"use client";
import Sidebar from "@/components/sidebar";

import React, { useCallback, useEffect } from "react";
import "../../app/globals.css";
import Navbar from "@/components/navbar";
import { useStore } from "@/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Dashboardlayout = ({ children }: { children: React.ReactNode; }) => {
  const supabase = createClientComponentClient();
  const isSidebar = useStore((state) => state.isSidebar);
  const setSuppliers = useStore((state) => state.setSuppliers);
  const setCategories = useStore((state) => state.setCategories);
  const setStockPlaces = useStore((state) => state.setStockPlaces);

  const getSuppliers = useCallback(async () => {
    const { data, error } = await supabase.from("suppliers").select("*");
    if (!data) return;
    setSuppliers(data);
  }, [supabase, setSuppliers]);

  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);

  const getCategories = useCallback(async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (!data) return;
    setCategories(data);
  }, [supabase, setCategories]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const getStockPlaces = useCallback(async () => {
    const { data, error } = await supabase.from("stock_places").select("*");
    if (!data) return;
    setStockPlaces(data);
  }, [supabase, setStockPlaces]);

  useEffect(() => {
    getStockPlaces();
  }, [getStockPlaces]);

  console.log("dashboard");
  return (
    <div
      style={{ transition: "0.2s" }}
      className={`${isSidebar ? "dashboardLayout" : "dashboardLayoutNotSidebar"
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
