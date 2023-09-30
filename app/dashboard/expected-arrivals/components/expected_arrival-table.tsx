"use client";
import { Database } from "@/schema";
import React, { FC, useState, useEffect,useCallback } from "react";
import OrderHistoryTableRow from "./expected_arrival-table-row";
import { useStore } from "@/store";
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
  const [allCheck, setAllCheck] = useState<"ADD" | "REMOVE" | null>(null);
  const checkedList = useStore((state) => state.checkedList);
  const setCheckedOrders = useStore((state) => state.setCheckedOrders);
  const setCheckedList = useStore((state) => state.setCheckedList);
  const removeCheckedList = useStore((state) => state.removeCheckedList);
  const resetCheckedList = useStore((state) => state.resetCheckedList);

  const handleAllCheckedList = () => {
    if (checkedList.length === 0) {
      setAllCheck("ADD");
    } else {
      resetCheckedList();
      setAllCheck("REMOVE");
    }
  };

  const isCheckedListIncludes = useCallback((id:string) => {
    return checkedList.includes(id)
  },[checkedList])

  useEffect(() => {
    resetCheckedList();
  }, [resetCheckedList]);

  useEffect(() => {
    const newOrders = checkedList.map((checkId) =>
      orders.find((order) => String(order.id) === checkId)
    )
    let array: Order[] = [];
    newOrders.forEach((order) => {
      if (order !== undefined) {
        array.push(order);
      }
    });
    setCheckedOrders(array);
  }, [checkedList, orders, setCheckedOrders]);

  const ThStyle = "p-1";

  return (
    <div className="w-full">
      <ExpectedArrivalControl setAllCheck={setAllCheck} />
      <div className="mt-3 overflow-auto max-h-[calc(100vh-220px)]">
        <table className="w-full min-w-[calc(1100px)]">
          <thead className="text-left text-xs sticky top-0 bg-zinc-50">
            <tr className="border-b h-12">
              <th className={`${ThStyle} text-center`}>
                <input type="checkbox"
                  checked={checkedList.length > 0 ? true : false}
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
              <th className={`${ThStyle} text-center`}>コメント</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {orders?.map((order) => (
              <OrderHistoryTableRow
                key={order.id}
                order={order}
                allCheck={allCheck}
                setAllCheck={setAllCheck}
                setCheckedList={setCheckedList}
                removeCheckedList={removeCheckedList}
                isCheckedListIncludes={isCheckedListIncludes}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpectedArrivalTable;
