/* eslint-disable react/display-name */
"use client";
import Modal from "@/components/ui/modal";
import { Database } from "@/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { FC, useRef, useEffect } from "react";
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
  setCheckList: React.Dispatch<React.SetStateAction<string[]>>;
  check: "ADD" | "REMOVE" | "NONE";
  setCheck: React.Dispatch<React.SetStateAction<"ADD" | "REMOVE" | "NONE">>;
}

const AllProductsTableRow: FC<Props> = React.memo(({ product, setCheckList, check, setCheck }): JSX.Element => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const inputRef = useRef<HTMLInputElement>(null);

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
  const handleCheckInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === true) {
      setCheckList((prevState: string[]) => [...prevState, e.target.name]);
    } else {
      setCheckList((prevState: string[]) => {
        const newCheckList = prevState.filter((check: string) => check !== e.target.name);
        return newCheckList;
      });
    }
  };

  useEffect(() => {
    if (!inputRef.current) return;
    if (check === "REMOVE") {
      inputRef.current.checked = false;
      setCheck("NONE");
    } else if (check === "ADD") {
      inputRef.current.checked = true;
      setCheckList((prevState: string[]) => [...prevState, product.id]);
      setCheck("NONE");
    }
  }, [product.id, check, setCheck, setCheckList]);

  const TdStyle = "p-1";

  return (
    <tr key={product.id} className="border-b h-12">
      <td className={`${TdStyle}`}>
        <div className="w-6 flex items-center justify-center">
          <input
            ref={inputRef}
            name={product.id}
            type="checkbox"
            onChange={handleCheckInput}
            className="cursor-pointer"
          />
        </div>
      </td>
      <td className={`${TdStyle}`}><OrderProduct /></td>
      <td className={`${TdStyle}`}>{product.use_type === "READY" ? "既成" : "別注"}</td>
      <td className={`${TdStyle}`}>
        <div>
          <div>{product.product_number}</div>
          <div>{product.product_name}</div>
        </div>
      </td>
      <td className={`${TdStyle}`}>{product.color_number} <span className="ml-2">{product.color_name}</span></td>
      <td className={`${TdStyle}`}>{product.size}</td>
      <td className={`${TdStyle}`}>{product.categories?.category_name}</td>
      <td className={`${TdStyle}`}>{product.suppliers?.supplier_name}</td>
      <td className={`${TdStyle} text-right`}>{product.price}</td>
      <td className={`${TdStyle} text-right`}>
        {product.skus && product?.skus[0]?.stock ? product?.skus[0]?.stock : 0}
      </td>
      <td className={`${TdStyle}`}>
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
});

export default AllProductsTableRow;
