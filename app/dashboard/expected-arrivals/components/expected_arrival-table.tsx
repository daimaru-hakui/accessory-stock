"use client";
import { Database } from "@/schema";
import React, { FC, useEffect, useCallback } from "react";
import OrderHistoryTableRow from "./expected_arrival-table-row";
import { useStore } from "@/app/store";
import ExpectedArrivalControl from "./expected-arrival-control";

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
  orders: Order[];
}

const ExpectedArrivalTable: FC<Props> = ({ orders }) => {
  const checkedOrders = useStore((state) => state.checkedOrders);
  const setCheckedOrders = useStore((state) => state.setCheckedOrders);

  useEffect(() => {
    setCheckedOrders([])
  },[setCheckedOrders])

  const handleAllCheckedList = () => {
    if (checkedOrders.length === 0) {
      setCheckedOrders(orders)
    } else {
      setCheckedOrders([])
    }
  };

  const handleCheckedBox = useCallback((e: React.ChangeEvent<HTMLInputElement>,id:number) => {
    if (e.target.checked) {
      const newOrder = orders.find((order) => order.id === id)
      if(!newOrder) return
      setCheckedOrders([...checkedOrders,newOrder]);
    } else {
      const newOrders = checkedOrders.filter((order) => {
        order.id !== id
      });
      setCheckedOrders(newOrders);
    }
  },[orders,checkedOrders,setCheckedOrders]);

  const isChecked = useCallback((id: number) => {
    const checkedList = checkedOrders.map((order) => (
      order.id
    ))
    return checkedList.includes(id);
  }, [checkedOrders]);


  const ThStyle = "p-1 px-3";

  return (
    <div className="w-full">
      <ExpectedArrivalControl />
      <div className="mt-3 overflow-auto max-h-[calc(100vh-220px)]">
        <table className="w-full min-w-[calc(1300px)]">
          <thead className="text-left text-xs sticky top-0 bg-zinc-50">
            <tr className="border-b h-12">
              <th className={`${ThStyle}`}>
                <input type="checkbox"
                  checked={checkedOrders.length > 0 ? true : false}
                  onChange={handleAllCheckedList} />
              </th>
              <th className={`${ThStyle}`}>確定処理</th>
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
              <th className={`${ThStyle}`}>コメント</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {orders?.map((order) => (
              <OrderHistoryTableRow
                key={order.id}
                handleCheckedBox={handleCheckedBox}
                order={order}
                isChecked={isChecked}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpectedArrivalTable;
