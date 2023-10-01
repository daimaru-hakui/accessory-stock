"use client";
import React, { FC, useState, useEffect, useCallback } from "react";
import AllProductsTableRow from "./all-products-table-row";
import { Database } from "@/schema";
import { useStore } from "@/app/store";
import AllProductsControl from "./all-products-control";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  skus: { id: string; stock: number; }[] | null;
  suppliers: { id: string; supplier_name: string; } | null;
  categories: { id: string; category_name: string; } | null;
}
interface Props {
  products: ProductRow[];
}

const AllProductsTable: FC<Props> = ({ products }) => {
  const setCheckedProducts = useStore((state) => state.setCheckedProducts);
  const checkedProducts = useStore((state) => state.checkedProducts);

  useEffect(() => {
    setCheckedProducts([]);
  }, [setCheckedProducts]);

  const handleAllCheckedList = () => {
    if (checkedProducts.length === 0) {
      setCheckedProducts(products);
    } else {
      setCheckedProducts([]);
    }
  };

  const handleCheckedBox = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      const newOrder = products.find((product) => product.id === id);
      if (!newOrder) return;
      setCheckedProducts([...checkedProducts, newOrder]);
    } else {
      const newOrders = checkedProducts.filter((product) => {
        product.id !== id;
      });
      setCheckedProducts(newOrders);
    }
  };

  const isChecked = useCallback((id: string) => {
    const checkedList = checkedProducts.map((order) => (
      order.id
    ));
    return checkedList.includes(id);
  }, [checkedProducts]);


  const ThStyle = "p-2";

  return (
    <div className="w-full">
      <AllProductsControl />
      <div className="mt-3 overflow-auto max-h-[calc(100vh-220px)]">
        <table className="w-full min-w-[calc(1200px)] ">
          <thead className="text-left text-xs sticky top-0 bg-zinc-50">
            <tr className="border-b h-12">
              <th className={`${ThStyle}`}>
                <div className="w-6 flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={checkedProducts.length > 0 ? true : false}
                    onChange={handleAllCheckedList}
                    className="cursor-pointer"
                  />
                </div>
              </th>
              <th className={`${ThStyle}`}>発注</th>
              <th className={`${ThStyle}`}>既成/別注</th>
              <th className={`${ThStyle}`}>品番/品名</th>
              <th className={`${ThStyle}`}>カラー</th>
              <th className={`${ThStyle}`}>サイズ</th>
              <th className={`${ThStyle}`}>カテゴリー</th>
              <th className={`${ThStyle}`}>仕入先</th>
              <th className={`${ThStyle} text-center`}>価格</th>
              <th className={`${ThStyle} text-right`}>徳島在庫</th>
              <th className={`${ThStyle}`}>コメント</th>
              <th className={`${ThStyle} text-center`}>アクション</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {products?.map((product) => (
              <AllProductsTableRow
                key={product.id}
                product={product}
                handleCheckedBox={handleCheckedBox}
                isChecked={isChecked}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProductsTable;
