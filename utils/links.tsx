import { MdOutlineDashboardCustomize, MdAddTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { RiIndentIncrease, RiIndentDecrease } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
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
    path: "/dashboard/expected-arrivals",
    name: "入荷予定",
    icon: <SlCalender />,
  },
  {
    path: "/dashboard/order",
    name: "発注履歴",
    icon: <SlCalender />,
  },
  {
    path: "/dashboard/incoming",
    name: "入荷履歴",
    icon: <RiIndentIncrease />,
  },
  {
    path: "/dashboard/outgoing",
    name: "出庫履歴",
    icon: <RiIndentDecrease />,
  },
];
