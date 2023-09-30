"use client";
import { Database } from "@/schema";
import React, { FC, useRef, useEffect } from "react";
import OrderConfirmModal from "./order-confirm-modal";
import { useStore } from "@/store";

type OrderDetail = Database["public"]["Tables"]["order_details"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  categories: { id: string; category_name: string; } | null;
  suppliers: { id: string; supplier_name: string; } | null;
  skus: { id: string; stock: number; }[] | null;
}

interface Order extends OrderDetail {
  products: ProductRow | null;
  stock_places: { id: number; stock_place_name: string; } | null;
}

interface Props {
  order: Order;
  allCheck: "ADD" | "REMOVE" | null;
  setAllCheck: React.Dispatch<React.SetStateAction<"ADD" | "REMOVE" | null>>;
  setCheckedList: (checked: string[]) => void;
  removeCheckedList: (checked: string) => void;
}

const ExpectedArrivalTableRow: FC<Props> = ({
  order,
  allCheck,
  setAllCheck,
  setCheckedList, removeCheckedList
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCheckInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === true) {
      setCheckedList([e.target.name]);
    } else {
      removeCheckedList(e.target.name);
    }
  };

  useEffect(() => {
    if (!inputRef.current) return;
    if (allCheck === "REMOVE") {
      inputRef.current.checked = false;
      setAllCheck(null);
    } else if (allCheck === "ADD") {
      inputRef.current.checked = true;
      setCheckedList([String(order.id)]);
      setAllCheck(null);
    }
  }, [allCheck, order.id, setAllCheck, setCheckedList]);

  const TdStyle = "p-1 px-3 ";
  return (
    <tr key={order.id} className="border-b h-12">
      <td className={`${TdStyle}`}>
        <input
          ref={inputRef}
          name={String(order.id)}
          type="checkbox"
          onChange={handleCheckInput}
          className="cursor-pointer"
        />
      </td>
      <td className={`${TdStyle}`}>
        <OrderConfirmModal order={order} />
      </td>
      <td className={`${TdStyle}`}>{order.order_id}</td>
      <td className={`${TdStyle}`}>{order.order_date}</td>
      <td className={`${TdStyle}`}>{order.availability_date}</td>
      <td className={`${TdStyle}`}>
        {order.products?.use_type === "READY" ? "既成" : "別注"}
      </td>
      <td className={`${TdStyle}`}>
        <div>{order.products?.product_number}</div>
        <div>{order.products?.product_name}</div>
      </td>
      <td className={`${TdStyle}`}>
        <div>{order.products?.color_number}</div>
        <div>{order.products?.color_name}</div>
      </td>
      <td className={`${TdStyle}`}>{order.products?.size}</td>
      <td className={`${TdStyle}`}>
        {order.products?.categories?.category_name}
      </td>
      <td className={`${TdStyle}`}>
        {order.products?.suppliers?.supplier_name}
      </td>
      <td className={`${TdStyle} text-right`}>{order.products?.price}</td>
      <td className={`${TdStyle} text-right`}>{order.quantity}</td>
      <td className={`${TdStyle}`}>{order.comment}</td>
    </tr>
  );
};

export default React.memo(ExpectedArrivalTableRow);
