"use client";
import Modal from "@/components/ui/modal";
import { Database } from "@/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { BiSolidTrashAlt } from "react-icons/bi";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  colors: { id: string; color_name: string } | null;
  skus: { id: string; stock: number }[] | null;
  suppliers: { id: string; supplier_name: string } | null;
  categories: { id: string; category_name: string } | null;
}
interface Props {
  product: ProductRow;
}

const AllProductsTableRow: FC<Props> = ({ product }): JSX.Element => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const deleteProduct = async (id: string, title:string = "") => {
    const result = confirm(`${title}を削除して宜しいでしょうか"`)
    if(!result) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    router.refresh();
    if (error) {
      console.log(error);
      return
    }
  };

  return (
    <tr key={product.id} className="border-b h-12">
      <td><Modal title="発注">ddddd</Modal></td>
      <td>
        <div>
          <div>{product.productNumber}</div>
          <div>{product.productName}</div>
        </div>
      </td>
      <td>{product.categories?.category_name}</td>
      <td>{product.colors?.color_name}</td>
      <td>{product.size}</td>
      <td>{product.suppliers?.supplier_name}</td>
      <td className="text-right">{product.price}</td>
      <td className="text-right">{product.skus && product?.skus[0]?.stock}</td>
      <td>
        <div className="flex justify-center">
          <BiSolidTrashAlt
            className="cursor-pointer"
            onClick={() => deleteProduct(product.id,product.productName)}
          />
        </div>
      </td>
    </tr>
  );
};

export default AllProductsTableRow;
