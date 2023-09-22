import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { Database } from "@/schema";
import AllProductsSearch from "./components/all-products-search";
import AllProductsTable from "./components/all-products-table";

const AllProducts = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  
  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select(`*,
    colors(id,color_name),
    skus(id,stock),
    suppliers(id,supplier_name),
    categories(id,category_name)
   `);
    return data;
  };

  const products = await fetchProducts();
  return (
    <div className="w-full">
      <h1 className="font-bold text-lg">付属品一覧</h1>
      <div className="mt-6">
        <AllProductsSearch />
      </div>
      <div className="mt-3 flex justify-center items center">
        <AllProductsTable products={products} />
      </div>
    </div>
  );
};

export default AllProducts;
