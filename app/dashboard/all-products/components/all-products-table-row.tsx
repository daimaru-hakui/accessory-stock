"use client";
import { Database } from "@/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { FC, useRef, useEffect } from "react";
import { BiSolidTrashAlt } from "react-icons/bi";
import { LuCopyPlus } from "react-icons/lu";
import EditProductModal from "./edit-product-modal";
import { useStore } from "@/store";
import OrderModal from "./order-modal";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  skus: { id: string; stock: number; }[] | null;
  suppliers: { id: string; supplier_name: string; } | null;
  categories: { id: string; category_name: string; } | null;
}
interface Props {
  product: ProductRow;
  allCheck: "ADD" | "REMOVE" | null;
  setAllCheck: React.Dispatch<React.SetStateAction<"ADD" | "REMOVE" | null>>;
  isCheckedListIncludes:(id:string) => boolean
}

const AllProductsTableRow: FC<Props> = ({ product, allCheck, setAllCheck ,isCheckedListIncludes}): JSX.Element => {
  const router = useRouter();
  const setCheckedList = useStore((state) => state.setCheckedList);
  const removeCheckedList = useStore((state) => state.removeCheckedList);
  const supabase = createClientComponentClient();
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleCheckInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === true) {
      setCheckedList([e.target.value]);
    } else {
      removeCheckedList(e.target.value);
    }
  };

  useEffect(() => {
    if (!inputRef.current) return;
    if (allCheck === "REMOVE") {
      inputRef.current.checked = false;
      setAllCheck(null);
    } else if (allCheck === "ADD") {
      inputRef.current.checked = true;
      setCheckedList([product.id]);
      setAllCheck(null);
    }
  }, [allCheck, product.id, setAllCheck, setCheckedList]);

  useEffect(() => {
    if (!inputRef.current) return;
    const result = isCheckedListIncludes(String(product.id));
    if (result) inputRef.current.checked = true;
    if (!result) inputRef.current.checked = false;
  }, [isCheckedListIncludes, product.id]);

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
            ref={inputRef}
            value={product.id}
            type="checkbox"
            onChange={handleCheckInput}
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
