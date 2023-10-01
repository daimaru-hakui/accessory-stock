"use client";
import { Database } from "@/schema";
import React, { FC, useRef, useEffect } from "react";
import OrderConfirmModal from "./order-confirm-modal";

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
  handleCheckedBox:(e: React.ChangeEvent<HTMLInputElement>,id:number)=>void
  isChecked: (id: number) => boolean;
}

const ExpectedArrivalTableRow: FC<Props> = ({
  order,
  handleCheckedBox,
  isChecked
}) => {

  const TdStyle = "p-1 px-3 ";

  return (
    <tr key={order.id} className="border-b h-12">
      <td className={`${TdStyle}`}>
        <input
          value={order.id}
          type="checkbox"
          checked={isChecked(order.id)}
          onChange={(e)=>handleCheckedBox(e,order.id)}
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
      <td className={`${TdStyle} text-right`}>{order.price}</td>
      <td className={`${TdStyle} text-right`}>{order.quantity}</td>
      <td className={`${TdStyle}`}>{order.comment}</td>
    </tr>
  );
};

export default ExpectedArrivalTableRow;
