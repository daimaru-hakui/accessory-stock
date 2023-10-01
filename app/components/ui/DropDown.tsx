"use client";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { BiMenu } from "react-icons/bi";

const DropDown = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggleClick = () => {
    setToggle(!toggle);
  };
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      <div className="p-2 cursor-pointer">
        <BiMenu
          style={{ fontSize: "24px" }}
          className="text-white"
          onClick={handleToggleClick}
        />
      </div>

      {toggle && (
        <div
          id="dropdown"
          className={`${
            toggle ? "display" : "hidden"
          } absolute top-12 right-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              onClick={handleSignOut}
            >
              ログアウト
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default DropDown;
