import React from "react";
import LogoutButton from "./logout-button";
import { BiMenuAltLeft } from "react-icons/bi";

const Navbar = () => {
  return (
    <div className="flex items-center w-full h-12 bg-blue-500">
      <nav>
        <BiMenuAltLeft style={{ fontSize: "36px" }} className="cursor-pointer text-white"/>
      </nav>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Navbar;
