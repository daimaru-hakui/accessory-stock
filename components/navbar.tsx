"use client";
import React from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./ui/DropDown";
import { useStore } from "@/store";

const Navbar = () => {
  const isSidebar = useStore((state) => state.isSidebar);
  const toggleIsSidebar = useStore((state) => state.toggleSidebar);

  return (
    <div className="flex items-center justify-between w-full h-10 bg-indigo-950 sticky top-0">
      <div className="p-2">
        <BiMenuAltLeft
          style={{ fontSize: "24px" }}
          className="cursor-pointer text-white"
          onClick={() => toggleIsSidebar()}
        />
      </div>
      {isSidebar}
      <nav className="flex">
        <DropDown />
      </nav>
    </div>
  );
};

export default Navbar;
