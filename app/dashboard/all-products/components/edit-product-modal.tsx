"use client";
import Modal from '@/app/components/ui/modal';
import { Database } from '@/schema';
import React, { FC, useState } from 'react';
import { BiSolidEditAlt } from "react-icons/bi";
import ProductForm from '../../add-product/components/product-form';

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  skus: { id: string; stock: number; }[] | null;
  suppliers: { id: string; supplier_name: string; } | null;
  categories: { id: string; category_name: string; } | null;
}
interface Props {
  product: ProductRow;
}

const EditProductModal: FC<Props> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BiSolidEditAlt className="cursor-pointer" onClick={() => setIsOpen(true)} />
      <Modal title="編集" isOpen={isOpen} setIsOpen={setIsOpen}>
        <ProductForm
          pageType="EDIT"
          defaultValues={product}
          id={product.id}
          setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
};

export default EditProductModal;