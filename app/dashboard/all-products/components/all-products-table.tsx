"use client";
import React, { FC, useState, useEffect } from "react";
import AllProductsTableRow from "./all-products-table-row";
import { Database } from "@/schema";
import Button from "@/components/ui/Button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import InOutStockTableModal from "./in-out-stock-table-modal";
import { useStore } from "@/store";

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
  const [check, setCheck] = useState<"ADD" | "REMOVE" | "NONE">("NONE");
  // const [checkList, setCheckList] = useState<string[]>([]);
  const checkedProducts = useStore((state) => state.checkedProducts);
  const setCheckedProducts = useStore((state) => state.setCheckedProducts);
  const checkedList = useStore((state) => state.checkedList);
  const resetCheckedList = useStore((state) => state.resetCheckedList);
  const router = useRouter();
  const supabase = createClientComponentClient();

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

  const removeProducts = async (products: ProductRow[]) => {
    if (products.length === 0) return;
    const result = confirm(`削除して宜しいでしょうか"`);
    if (!result) return;
    products.forEach(async (product) => {
      const { error } = await supabase
        .from("products")
        .update({
          deleted_at: new Date(),
        })
        .eq("id", product?.id);
      if (error) {
        console.log(error);
        return;
      }
    });
    resetCheckedList();
    setCheck("REMOVE");
    router.refresh();
  };

  const ThStyle = "p-1";

  return (
    <div className="w-full">
      <div>
        <div className="h-8">
          {checkedProducts && checkedList.length > 0 && (
            <div className="flex justify-between gap-3">
              <div className="flex gap-3">
                <InOutStockTableModal
                  pageType="IN"
                />
                <InOutStockTableModal
                  pageType="OUT"
                />
              </div>
              <Button
                colorScheme="red"
                onClick={() => removeProducts(checkedProducts)}
              >
                削除
              </Button>
            </div>
          )}
        </div>
      </div>
      <table className="w-full mt-3">
        <thead className="text-left text-xs">
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
            <th className={`${ThStyle}`}>order</th>
            <th className={`${ThStyle}`}>既成/別注</th>
            <th className={`${ThStyle}`}>品番/品名</th>
            <th className={`${ThStyle}`}>カラー</th>
            <th className={`${ThStyle}`}>サイズ</th>
            <th className={`${ThStyle}`}>カテゴリー</th>
            <th className={`${ThStyle}`}>仕入先</th>
            <th className={`${ThStyle} text-center`}>価格</th>
            <th className={`${ThStyle} text-right`}>徳島在庫</th>
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
  );
};

export default AllProductsTable;
