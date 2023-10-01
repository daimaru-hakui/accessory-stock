import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/input";
import React from "react";

const AllProductsSearch = () => {
  return (
    <div className="flex gap-3">
      <Input />
      <Button>検索</Button>
    </div>
  );
};

export default AllProductsSearch;
