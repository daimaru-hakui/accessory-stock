import Button from "@/components/ui/Button";
import Input from "@/components/ui/input";
import React from "react";

const AllProductsSearch = () => {
  return (
    <div className="flex gap-3">
      <Input />
      <Button colorScheme="blue">検索</Button>
    </div>
  );
};

export default AllProductsSearch;
