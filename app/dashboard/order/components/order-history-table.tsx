"use client";
import { Database } from "@/schema";
import React, { FC } from "react";
import OrderHistoryTableRow from "./order-history-table-row";

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
  order_details:OrderDetailRow []
}

interface Props {
  orders: OrderRow[];
}

const OrderHistoryTable: FC<Props> = ({ orders }) => {

  const ThStyle = "p-1";

  return (
    <div className="overflow-auto max-h-[calc(100vh-110px)]">
      <table className="w-full min-w-[calc(1100px)]">
        <thead className="text-left text-xs sticky top-0 bg-zinc-50">
          <tr className="border-b h-12">
            <th className={`${ThStyle}`}>発注No.</th>
            <th className={`${ThStyle}`}>発注日</th>
            <th className={`${ThStyle}`}>入荷予定日</th>
            <th className={`${ThStyle}`}>既成/別注</th>
            <th className={`${ThStyle}`}>品番/品名</th>
            <th className={`${ThStyle}`}>カラー</th>
            <th className={`${ThStyle} `}>サイズ</th>
            <th className={`${ThStyle}`}>カテゴリー</th>
            <th className={`${ThStyle}`}>仕入先</th>
            <th className={`${ThStyle} text-center`}>価格</th>
            <th className={`${ThStyle} text-center`}>数量</th>
            <th className={`${ThStyle} text-center`}>合計</th>
            <th className={`${ThStyle} text-center`}>コメント</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {orders?.map((order) => (
            <OrderHistoryTableRow
              key={order.id}
              order={order}
          />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;
