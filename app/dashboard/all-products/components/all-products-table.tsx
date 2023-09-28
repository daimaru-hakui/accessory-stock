"use client";
import React, { FC, useState, useEffect } from "react";
import AllProductsTableRow from "./all-products-table-row";
import { Database } from "@/schema";
import { useStore } from "@/store";
import AllProductsControl from "./all-products-control";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  skus: { id: string; stock: number }[] | null;
  suppliers: { id: string; supplier_name: string } | null;
  categories: { id: string; category_name: string } | null;
}
interface Props {
  products: ProductRow[];
}

const AllProductsTable: FC<Props> = ({ products }) => {
  const [check, setCheck] = useState<"ADD" | "REMOVE" | "NONE">("NONE");
  const setCheckedProducts = useStore((state) => state.setCheckedProducts);
  const checkedList = useStore((state) => state.checkedList);
  const resetCheckedList = useStore((state) => state.resetCheckedList);

  const handleAllCheckedList = () => {
    if (checkedList.length === 0) {
      setCheck("ADD");
    } else {
      resetCheckedList();
      setCheck("REMOVE");
    }
  };

  useEffect(() => {
    const newProducts = checkedList.map((checkId) =>
      products.find((product) => product.id === checkId)
    );
    let array: ProductRow[] = [];
    newProducts.forEach((product) => {
      if (product !== undefined) {
        array.push(product);
      }
    });
    setCheckedProducts(array);
  }, [products, checkedList, setCheckedProducts]);

  const ThStyle = "p-2";

  return (
    <div className="w-full">
      <AllProductsControl setCheck={setCheck} />
      <div className="mt-3 overflow-auto max-h-[calc(100vh-220px)]">
        <table className="w-full min-w-[calc(1100px)] ">
          <thead className="text-left text-xs sticky top-0 bg-zinc-50">
            <tr className="border-b h-12">
              <th className={`${ThStyle}`}>
                <div className="w-6 flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={checkedList.length > 0 ? true : false}
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
                check={check}
                setCheck={setCheck}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProductsTable;
