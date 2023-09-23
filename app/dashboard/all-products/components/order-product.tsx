import Button from '@/components/ui/Button';
import Modal from '@/components/ui/modal';
import React, { useState } from 'react';


const OrderProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>発注</Button>
      <Modal title="発注" isOpen={isOpen} setIsOpen={setIsOpen}>
        ｓｓｓｓ
      </Modal>
    </>
  );
};

export default OrderProduct;