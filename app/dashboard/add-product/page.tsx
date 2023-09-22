import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import ProductForm from "./components/product-form";
import { Database } from "@/schema";

const AddProduct = async() => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const fetchColors = async() => {
    const {data} = await supabase.from("colors")
    .select(`*`)
    return data
  }

  const fetchSuppliers = async() => {
    const {data} = await supabase.from("suppliers")
    .select(`*`)
    return data
  }

  const fetchCategories = async() => {
    const {data} = await supabase.from("categories")
    .select(`*`)
    return data
  }

  const colors = await fetchColors()
  const suppliers = await fetchSuppliers()
  const categories = await fetchCategories()

  console.log(colors)
  
  return (
    <div className="w-full">
      <h1 className="font-bold text-lg">付属品登録</h1>
      <div className="mt-6 flex justify-center items center">
        <ProductForm colors={colors} suppliers={suppliers} categories={categories}/>
      </div>
    </div>
  );
};

export default AddProduct;
