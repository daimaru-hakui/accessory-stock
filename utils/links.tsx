import { MdOutlineDashboardCustomize, MdAddTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { RiIndentIncrease, RiIndentDecrease } from "react-icons/ri";
export const menuLinks = [{}];

export const sidebarLinks = [
  {
    path: "/dashboard",
    name: "ダッシュボード",
    icon: <MdOutlineDashboardCustomize />,
  },
  {
    path: "/dashboard/add-product",
    name: "付属品登録",
    icon: <MdAddTask />,
  },
  {
    path: "/dashboard/all-products",
    name: "付属品一覧",
    icon: <FaTasks />,
  },
  {
    path: "/dashboard/incoming",
    name: "入庫履歴",
    icon: <RiIndentIncrease />,
  },
  {
    path: "/dashboard/outgoing",
    name: "出庫履歴",
    icon: <RiIndentDecrease />,
  },
];
