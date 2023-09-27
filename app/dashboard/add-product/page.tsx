import React from "react";
import ProductForm from "./components/product-form";
import { EditedProduct } from "@/types";

const AddProduct = async () => {

  const defaultValues: EditedProduct = {
    use_type: "READY",
    product_name: "",
    product_number: "",
    category_id: "",
    color_number: "",
    color_name: "",
    size: "",
    supplier_id: "",
    price: "",
    comment: ""
  };

  return (
    <div className="w-full">
      <h1 className="font-bold text-lg">付属品登録</h1>
      <div className="mt-6 flex justify-center items center">
        <ProductForm
          pageType="NEW"
          defaultValues={defaultValues}
        />
      </div>
    </div>
  );
};

export default AddProduct;
