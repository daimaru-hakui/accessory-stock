import Button from '@/components/ui/Button';
import Modal from '@/components/ui/modal';
import { Database } from '@/schema';
import React, { useState, FC } from 'react';

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  skus: { id: string; stock: number; }[] | null;
  suppliers: { id: string; supplier_name: string; } | null;
  categories: { id: string; category_name: string; } | null;
}
interface Props {
  checkedProducts: (ProductRow | undefined)[];
}

const OutgoingModal: FC<Props> = ({ checkedProducts }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(checkedProducts);
  return (
    <>
      <Button
        colorScheme="orange"
        className="cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        出庫
      </Button>
      <Modal title="出庫" isOpen={isOpen} setIsOpen={setIsOpen}>
      </Modal>
    </>
  );
};

export default OutgoingModal;