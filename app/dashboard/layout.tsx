"use client";

import React, { useCallback, useEffect } from "react";
import "../../app/globals.css";
import Navbar from "@/app/components/navbar";
import { useStore } from "@/app/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DrawerSidebar from "@/app/components/drawer-sidebar";
import LoadingSpinner from "@/app/components/ui/loading-spinner";
import Sidebar from "../components/sidebar";

const Dashboardlayout = ({ children }: { children: React.ReactNode; }) => {
  const supabase = createClientComponentClient();
  const isSidebar = useStore((state) => state.isSidebar);
  const setSession = useStore((state) => state.setSession);
  const setSuppliers = useStore((state) => state.setSuppliers);
  const setCategories = useStore((state) => state.setCategories);
  const setStockPlaces = useStore((state) => state.setStockPlaces);

  const getSession = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    setSession(session);
  }, [supabase, setSession]);

  useEffect(() => {
    getSession();
  }, [getSession]);

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
    <>
    <LoadingSpinner/>
    <div
      style={{ transition: "0.2s" }}
      className={`${isSidebar ? "dashboardLayout" : "dashboardLayoutNotSidebar"}`}
    >
      <Sidebar />
      <DrawerSidebar />
      <main className={`grid content-start w-full`}>
        <Navbar />
        <div className="px-6 py-3 w-full overflow-hidden">
          {children}
        </div>
      </main>
    </div>
    </>
  );
};

export default Dashboardlayout;
