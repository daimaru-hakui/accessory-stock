"use client";
import { Database } from "@/schema";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import ProductForm from "../../components/product-form";
import { EditedProduct } from "@/app/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";

type Product = Database["public"]["Tables"]["products"]["Row"];

const AddCopyPage: NextPage = () => {
  const supabase = createClientComponentClient<Database>();
  const pathname = useParams();
  const id = pathname?.id || "";
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const getProduct = async () => {
      const { data,error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.log(error);
      }
      if (!data) return;
      setProduct(data);
    };
    getProduct();
  }, [id, supabase]);

  if (!product) return;

  const defaultValues: EditedProduct = {
    use_type: product.use_type,
    product_name: product.product_name,
    product_number: product.product_number,
    category_id: product.category_id,
    color_number: product.color_number,
    color_name: product.color_name,
    size: product.size,
    supplier_id: product.supplier_id,
    price: product.price,
    comment: product.comment,
  };

  return (
    <div className="w-full">
      <h1 className="font-bold text-lg">付属品登録（コピー）</h1>
      <div className="mt-6 flex justify-center items center">
        <ProductForm pageType="NEW" defaultValues={defaultValues} />
      </div>
    </div>
  );
};

export default AddCopyPage;
