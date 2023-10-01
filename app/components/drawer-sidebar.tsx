import { useStore } from "@/app/store";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { sidebarLinks } from "@/app/utils/links";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "@/app/logo";

const DrawerSidebar: FC = () => {
  const isSidebar = useStore((state) => state.isSidebar);
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  const pathname = usePathname();

  return (
    <>
      <aside
        className="min-h-screen bg-zinc-100 block md:hidden fixed z-30 top-0"
        style={{
          transform: isSidebar ? "translateX(0)" : "translateX(-250px)",
          transition: "0.2s",
          width: "250px",
        }}
      >
        <div className="sticky top-0 z-30">
          <div className="px-3 h-12 flex items-center justify-between">
            <div><Logo /></div>
            <div>
              <AiOutlineClose className="cursor-pointer" onClick={toggleSidebar} />
            </div>
          </div>
          <ul className="px-2">
            {sidebarLinks.map(({ path, name, icon }) => (
              <li
                key={path}
                className="my-1"
                style={{
                  fontWeight: path === pathname ? "bold" : "normal",
                }}
              >
                <Link href={path} className="flex items-center gap-3 py-2 px-3 text-sm hover:font-bold hover:bg-gray-50 rounded-sm" onClick={toggleSidebar}>
                  <div>{icon}</div>
                  <div>{name}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default DrawerSidebar;
