"use client";
import Button from '@/components/ui/Button';
import { Database } from '@/schema';
import React, { FC } from 'react';
import OrderConfirmModal from './order-confirm-modal';

type OrderHistory = Database["public"]["Tables"]["order_histories"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];
type StockPlace = Database["public"]["Tables"]["stock_places"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];
type Supplier = Database["public"]["Tables"]["suppliers"]["Row"];

interface ProductRow extends Product {
  categories: Category | null;
  suppliers: Supplier | null;
}

interface Order extends OrderHistory {
  products: ProductRow | null;
  stock_places: StockPlace | null;
}

interface Props {
  order: Order;
}

const OrderHistoryTableRow: FC<Props> = ({ order }) => {

  const TdStyle = "p-1 px-3 ";
  return (
    <tr key={order.id} className="border-b h-12">
      <td className={`${TdStyle}`}>
        <OrderConfirmModal order={order} />
      </td>
      <td className={`${TdStyle}`}>
        {order.id}
      </td>
      <td className={`${TdStyle}`}>
        {order.order_date}
      </td>
      <td className={`${TdStyle}`}>
        {order.availability_date}
      </td>
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
      <td className={`${TdStyle}`}>
        {order.products?.size}
      </td>
      <td className={`${TdStyle}`}>
        {order.products?.categories?.category_name}
      </td>
      <td className={`${TdStyle}`}>
        {order.products?.suppliers?.supplier_name}
      </td>
      <td className={`${TdStyle} text-right`}>
        {order.products?.price}
      </td>
      <td className={`${TdStyle} text-right`}>
        {order.quantity}
      </td>
      <td className={`${TdStyle}`}>
        {order.comment}
      </td>

    </tr >
  );
};

export default OrderHistoryTableRow;