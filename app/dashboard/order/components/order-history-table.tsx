import { Database } from "@/schema";
import React, { FC } from "react";
import OrderHistoryTableRow from "./order-history-table-row";

type OrderDetails = Database["public"]["Tables"]["order_details"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];
type StockPlace = Database["public"]["Tables"]["stock_places"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];
type Supplier = Database["public"]["Tables"]["suppliers"]["Row"];

interface Products extends Product {
  categories: Category | null;
  suppliers: Supplier | null;
}

interface Order extends OrderDetails {
  products: Products | null;
  stock_places: StockPlace | null;
}

interface Props {
  orders: Order[];
}

const OrderHistoryTable: FC<Props> = ({ orders }) => {
  const ThStyle = "p-1";

  return (
    <div className="overflow-auto max-h-[calc(100vh-110px)]">
      <table className="w-full min-w-[calc(1100px)]">
        <thead className="text-left text-xs sticky top-0 bg-zinc-50">
          <tr className="border-b h-12">
            <th className={`${ThStyle}`}>アクション</th>
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
            <th className={`${ThStyle} text-center`}>コメント</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {orders?.map((order) => (
            <OrderHistoryTableRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;
