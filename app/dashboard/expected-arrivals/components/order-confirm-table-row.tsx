import Input from "@/components/ui/input";
import { Database } from "@/schema";
import { useStore } from "@/store";
import React, { FC } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";

type OrderDetail = Database["public"]["Tables"]["order_details"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  categories: { id: string; category_name: string; } | null;
  suppliers: { id: string; supplier_name: string; } | null;
  skus: { id: string; stock: number; }[] | null;
}

interface Order extends OrderDetail {
  products: ProductRow | null;
  stock_places: { id: number; stock_place_name: string; } | null;
}

interface Props {
  order: Order;
  mothods: UseFormReturn<Inputs, any, undefined>;
  idx: number;
  stockPlaceId: number;
}

type Inputs = {
  incomingDate: string;
  stockPlace: number;
  contents: {
    id: number;
    price: number;
    quantity: number;
    availabilityDate: string;
    remainingQuantity: number;
    comment: string;
    productId: string;
    prevStock: number;
  }[];
};

const OrderConfirmTableRow: FC<Props> = ({
  order,
  mothods,
  idx,
  stockPlaceId
}) => {
  const checkedOrders = useStore((state) => state.checkedOrders);
  const setCheckedOrders = useStore((state) => state.setCheckedOrders);
  const { register, control, watch, setValue } = mothods;

  const handleCheckedClose = (idx: number) => {
    const newOrders = checkedOrders.filter(
      (_, index: number) => index !== idx
    );
    setCheckedOrders(newOrders);
    remove(idx);
  };

  const { remove } = useFieldArray({
    control,
    name: "contents",
  });

  const quantity =
    (order.quantity - watch(`contents.${idx}.quantity`) >= 0 ?
      order.quantity - watch(`contents.${idx}.quantity`) : 0
    );
  setValue(`contents.${idx}.remainingQuantity`, quantity);

  const TdStyle = "p-1 px-3 text-sm ";

  return (
    <tr key={order.id} className="border-b h-12">
      <td className={`${TdStyle}`}>
        <input
          style={{ display: "none" }}
          value={order.id}
          {...register(`contents.${idx}.id`)}
        />
        <input
          style={{ display: "none" }}
          defaultValue={order.product_id}
          {...register(`contents.${idx}.productId`)}
        />
        <input
          style={{ display: "none" }}
          value={order.products?.skus ? order.products?.skus[stockPlaceId].stock : 0}
          {...register(`contents.${idx}.prevStock`)}
        />

        <div>{order.products?.product_number}</div>
        <div>{order.products?.product_name}</div>
      </td>
      <td className={`${TdStyle}`}>
        <div>{order.products?.color_number}</div>
        <div>{order.products?.color_name}</div>
      </td>
      <td className={`${TdStyle} text-center`}>{order.products?.size}</td>
      <td className={`${TdStyle}`}>{order.products?.categories?.category_name}</td>
      <td className={`${TdStyle}`}>{order.products?.suppliers?.supplier_name}</td>
      <td className={`${TdStyle}`}>
        <Input
          type="number"
          className="w-24"
          required={true}
          defaultValue={order.price}
          register={{
            ...register(`contents.${idx}.price`, {
              required: true,
              min: 0.01,
            }),
          }}
        />
      </td>
      <td className={`${TdStyle} w-24 pr-6 text-right`}>{order.quantity}</td>
      <td className={`${TdStyle}`}>
        <Input
          type="number"
          className="w-24"
          required={true}
          defaultValue={order.quantity}
          register={{
            ...register(`contents.${idx}.quantity`, {
              required: true,
              min: 0.01,
            }),
          }}
        />
      </td>
      <td className={`${TdStyle}`}>
        <Input
          type="number"
          className="w-24"
          required={true}
          defaultValue={0}
          register={{
            ...register(`contents.${idx}.remainingQuantity`, {
              required: true,
              min: 0,
            }),
          }}
        />
      </td>
      <td className={`${TdStyle}`}>
        <Input
          className="w-64"
          register={{
            ...register(`contents.${idx}.comment`),
          }}
        />
      </td>
      <td>
        <div className="flex justify-center">
          <AiOutlineClose
            className="cursor-pointer"
            onClick={() => handleCheckedClose(idx)}
          />
        </div>
      </td>
    </tr>
  );
};

export default OrderConfirmTableRow;
