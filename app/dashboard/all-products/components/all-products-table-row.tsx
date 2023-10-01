"use client";
import { Database } from "@/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { BiSolidTrashAlt } from "react-icons/bi";
import { LuCopyPlus } from "react-icons/lu";
import EditProductModal from "./edit-product-modal";
import OrderModal from "./order-modal";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  skus: { id: string; stock: number; }[] | null;
  suppliers: { id: string; supplier_name: string; } | null;
  categories: { id: string; category_name: string; } | null;
}
interface Props {
  product: ProductRow;
  handleCheckedBox: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  isChecked: (id: string) => boolean;
}

const AllProductsTableRow: FC<Props> = ({ product,handleCheckedBox,isChecked}): JSX.Element => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const removeProduct = async (id: string, title: string = "") => {
    const result = confirm(`${title}を削除して宜しいでしょうか"`);
    if (!result) return;
    const { error } = await supabase
      .from("products")
      .update({
        deleted_at: new Date(),
      })
      .eq("id", id);
    router.refresh();
    if (error) {
      console.log(error);
      return;
    }
  };

  const addCopy = (id: string) => {
    const result = confirm("商品をコピーしますか？");
    if (!result) return;
    router.push(`/dashboard/add-product/copy/${id}`);
  };

  const TdStyle = "p-2";

  return (
    <tr key={product.id} className="border-b h-12">
      <td className={`${TdStyle}`}>
        <div className="w-6 flex items-center justify-center">
          <input
            value={product.id}
            type="checkbox"
            checked={isChecked(product.id)}
            onChange={(e)=>handleCheckedBox(e,product.id)}
            className="cursor-pointer"
          />
        </div>
      </td>
      <td className={`${TdStyle}`}>
        <OrderModal product={product} />
      </td>
      <td className={`${TdStyle}`}>
        {product.use_type === "READY" ? <span>既成</span> : <span>別注</span>}
      </td>
      <td className={`${TdStyle}`}>
        <div>
          <div>{product.product_number}</div>
          <div>{product.product_name}</div>
        </div>
      </td>
      <td className={`${TdStyle}`}>
        {product.color_number}
        <span className="ml-2">{product.color_name}</span>
      </td>
      <td className={`${TdStyle}`}>{product.size}</td>
      <td className={`${TdStyle}`}>{product.categories?.category_name}</td>
      <td className={`${TdStyle}`}>{product.suppliers?.supplier_name}</td>
      <td className={`${TdStyle} text-right`}>{product.price}</td>
      <td className={`${TdStyle} text-right`}>
        {product.skus && product?.skus[0]?.stock
          ? product?.skus[0]?.stock
          : 0}
      </td>
      <td className={`${TdStyle}`}>{product.comment}</td>
      <td className={`${TdStyle}`}>
        <div className="flex justify-center gap-3 text-lg">
          <LuCopyPlus
            className="cursor-pointer"
            onClick={() => addCopy(product.id)}
          />
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
