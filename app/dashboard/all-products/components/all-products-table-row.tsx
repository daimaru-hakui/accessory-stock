"use client";
import Modal from "@/components/ui/modal";
import { Database } from "@/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { BiSolidTrashAlt } from "react-icons/bi";
import OrderProduct from "./order-product";
import EditProductModal from "./edit-product-modal";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  skus: { id: string; stock: number; }[] | null;
  suppliers: { id: string; supplier_name: string; } | null;
  categories: { id: string; category_name: string; } | null;
}
interface Props {
  product: ProductRow;
}

const AllProductsTableRow: FC<Props> = ({ product }): JSX.Element => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const removeProduct = async (id: string, title: string = "") => {
    const result = confirm(`${title}を削除して宜しいでしょうか"`);
    if (!result) return;
    const { error } = await supabase.from("products").update({
      deleted_at: new Date()
    }).eq("id", id);
    router.refresh();
    if (error) {
      console.log(error);
      return;
    }
  };
  // const deleteProduct = async (id: string, title: string = "") => {
  //   const result = confirm(`${title}を削除して宜しいでしょうか"`);
  //   if (!result) return;
  //   const { error } = await supabase.from("products").delete().eq("id", id);
  //   router.refresh();
  //   if (error) {
  //     console.log(error);
  //     return;
  //   }
  // };

  return (
    <tr key={product.id} className="border-b h-12">
      <td><OrderProduct /></td>
      <td>{product.use_type === "READY" ? "既成" : "別注"}</td>
      <td>
        <div>
          <div>{product.product_number}</div>
          <div>{product.product_name}</div>
        </div>
      </td>
      <td>{product.color_number} <span className="ml-2">{product.color_name}</span></td>
      <td>{product.size}</td>
      <td>{product.categories?.category_name}</td>
      <td>{product.suppliers?.supplier_name}</td>
      <td className="text-right">{product.price}</td>
      <td className="text-right">{product.skus && product?.skus[0]?.stock}</td>
      <td>
        <div className="flex justify-center gap-3 text-lg">
          <EditProductModal product={product} />
          <BiSolidTrashAlt
            className="cursor-pointer"
            onClick={() => removeProduct(product.id, product.product_name)}
          />
        </div>
      </td>
    </tr>
  );
};

export default AllProductsTableRow;
