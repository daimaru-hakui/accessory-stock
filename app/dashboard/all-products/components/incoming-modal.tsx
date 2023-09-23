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


const IncomingModal: FC<Props> = ({ checkedProducts }) => {
  console.log(checkedProducts);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        colorScheme="green"
        className="cursor-pointer"
        onClick={() => setIsOpen(true)}>
        入庫
      </Button>
      <Modal title="入庫" isOpen={isOpen} setIsOpen={setIsOpen}>
      </Modal>
    </>
  );
};

export default IncomingModal;