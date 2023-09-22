"use client";
import { useStore } from "@/store";
import { sidebarLinks } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const isSidebar = useStore((state) => state.isSidebar);
  const pathname = usePathname();
  return (
    <aside
      className="min-h-screen bg-zinc-100 hidden md:block"
      style={{
        transform: isSidebar ? "translateX(0)" : "translateX(-250px)",
        transition: "0.2s",
      }}
    >
      <div className="sticky top-0">
        <div className="px-6 h-12 flex items-center">大丸白衣</div>
        <ul className="px-2">
          {sidebarLinks.map(({ path, name, icon }) => (
            <li
              key={path}
              className="my1 py-2 px-3 text-sm hover:font-bold hover:bg-gray-50 rounded-sm"
              style={{ fontWeight: path === pathname ? "bold" : "normal" }}
            >
              <Link href={path} className="flex items-center gap-3">
                <div>{icon}</div>
                <div>{name}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
