import React, { FC } from "react";
import AllProductsTableRow from "./all-products-table-row";
import { Database } from "@/schema";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  skus: { id: string; stock: number; }[] | null;
  suppliers: { id: string; supplier_name: string; } | null;
  categories: { id: string; category_name: string; } | null;
}
interface Props {
  products: ProductRow[] | null;
}

const AllProductsTable: FC<Props> = ({ products }) => {
  return (
    <table className="w-full">
      <thead className="text-left text-xs">
        <tr className="border-b h-12">
          <th>order</th>
          <th>既成/別注</th>
          <th>品番/品名</th>
          <th>カラー</th>
          <th>サイズ</th>
          <th>カテゴリー</th>
          <th>仕入先</th>
          <th className="text-center">価格</th>
          <th className="text-right">徳島在庫</th>
          <th className="text-center">アクション</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {products?.map((product) => (
          <AllProductsTableRow key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
};

export default AllProductsTable;
