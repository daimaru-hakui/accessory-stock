import Button from '@/components/ui/Button';
import Input from '@/components/ui/input';
import Modal from '@/components/ui/modal';
import { Database } from '@/schema';
import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";

type OrderHistory = Database["public"]["Tables"]["order_histories"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];
type StockPlace = Database["public"]["Tables"]["stock_places"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];
type Supplier = Database["public"]["Tables"]["suppliers"]["Row"];

interface ProductRow extends Product {
  categories: Category | null;
  suppliers: Supplier | null;
}

interface Order extends OrderHistory {
  products: ProductRow | null;
  stock_places: StockPlace | null;
}

interface Props {
  order: Order;
}


type Inputs = {
  price: number;
  quantity: number;
  availabilityDate: string;
};

const OrderConfirmModal: FC<Props> = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      price: order.products?.price,
      quantity: order.quantity,
      availabilityDate: order.availability_date
    }
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => { };

  return (
    <>
      <Button
        colorScheme="green"
        className="cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        確定
      </Button>
      <Modal
        title="確定"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeButton={false}
        reset={reset}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[calc(450px)] pb-6"
        >
          <div className='font-bold text-sm'>商品名</div>
          <div>{order.products?.product_number}</div>
          <div>{order.products?.product_name}</div>
          <div className="mt-6 flex flex-col gap-6">
            <div className="flex gap-3">
              <div className='w-full'>
                <Input label="入荷日" type="date" className='w-full'
                  register={{ ...register("availabilityDate") }}
                />
              </div>
            </div>

            <div>
              <Input
                label="単価"
                type="number"
                className="w-full"
                required={true}
                register={{ ...register("price", { required: true, min: 0.01 }) }}
              />
            </div>
            <div>
              <Input
                label="数量"
                type="number"
                className="w-full"
                required={true}
                register={{ ...register("quantity", { required: true, min: 0.01 }) }}
              />
            </div>

            <div>
            </div>
            <div>
              <Button type="submit" className="w-full">
                次へ
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default OrderConfirmModal;