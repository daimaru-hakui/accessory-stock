"use client";
import { Database } from "@/schema";
import React, { FC } from "react";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type OrderDetail = Database["public"]["Tables"]["order_details"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  categories: { id: string; category_name: string; } | null;
  suppliers: { id: string; supplier_name: string; } | null;
  skus: { id: string; stock: number; }[] | null;
}

interface OrderDetailRow extends OrderDetail {
  products: ProductRow | null;
  stock_places: { id: number; stock_place_name: string; } | null;
}

interface OrderRow extends Order {
  order_details: OrderDetailRow[];
}

interface Props {
  order: OrderRow;
}

const OrderHistoryTableRow: FC<Props> = ({
  order,
}) => {

  const TdStyle = "p-1 px-3 ";
  return (
    <tr key={order.id} className="border-b h-12">
      <td className={`${TdStyle}`}>{order.id}</td>
      <td className={`${TdStyle}`}>{order.order_details[0].order_date}</td>
      <td className={`${TdStyle}`}>{order.order_details[0].availability_date}</td>
      <td className={`${TdStyle}`}>
        {order.order_details.map((detail) => (
          <div key={detail.id}>
            {detail.products?.use_type === "READY" ? <span>既成</span> : <span>別注</span>}
          </div>
        ))}
      </td>
      <td className={`${TdStyle}`}>
        {order.order_details.map((detail) => (
          <div key={detail.id} className="flex gap-1">
            <div>{detail.products?.product_number}</div>
            <div>{detail?.products?.product_name}</div>
          </div>
        ))}
      </td>
      <td className={`${TdStyle}`}>
        {order.order_details.map((detail) => (
          <div key={detail.id} className="flex gap-1">
            <div>{detail.products?.color_number}</div>
            <div>{detail?.products?.color_name} </div>
          </div>
        ))}
      </td>
      <td className={`${TdStyle}`}>
        {order.order_details.map((detail) => (
          <div key={detail.id}>{detail?.products?.size}</div>
        ))}
      </td>
      <td className={`${TdStyle}`}>
        {order.order_details.map((detail) => (
          <div key={detail.id}>{detail.products?.categories?.category_name}</div>
        ))}
      </td>
      <td className={`${TdStyle}`}>
        {order.order_details.map((detail) => (
          <div key={detail.id}>{detail.products?.suppliers?.supplier_name}</div>
        ))}
      </td>
      <td className={`${TdStyle} text-right`}>
        {order.order_details.map((detail) => (
          <div key={detail.id}>{detail.price}円</div>
        ))}
      </td>
      <td className={`${TdStyle} text-right`}>
        {order.order_details.map((detail) => (
          <div key={detail.id}>{detail.order_quantity}</div>
        ))}
      </td>
      <td className={`${TdStyle} text-right`}>
        {order.order_details.map((detail) => (
          <div key={detail.id}>
            {(detail.price * detail.order_quantity).toLocaleString('ja-JP')}円
          </div>
        ))}
      </td>
      <td className={`${TdStyle}`}>
        {order.order_details.map((detail) => (
          <div key={detail.id}>{detail.comment}</div>
        ))}
      </td>
    </tr>
  );
};

export default React.memo(OrderHistoryTableRow);
