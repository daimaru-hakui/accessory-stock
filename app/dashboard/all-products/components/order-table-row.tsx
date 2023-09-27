import Input from '@/components/ui/input';
import { Database } from '@/schema';
import { useStore } from '@/store';
import React, { FC } from 'react';
import { Control, UseFormRegister, useFieldArray } from 'react-hook-form';
import { AiOutlineClose } from "react-icons/ai";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  skus: { id: string; stock: number; }[] | null;
  suppliers: { id: string; supplier_name: string; } | null;
  categories: { id: string; category_name: string; } | null;
}
interface Props {
  product: ProductRow;
  register: UseFormRegister<Inputs>;
  control: Control<Inputs>;
  idx: number;
  stockPlaceId: number;
}

type Inputs = {
  availabilityDate: string;
  orderDate: string;
  contents: {
    productId: string;
    skuId: string;
    stock: number;
    quantity: number;
  }[];
};

const OrderTableRow: FC<Props> = ({ product, register, control, idx, stockPlaceId }) => {
  const checkedProducts = useStore((state) => state.checkedProducts);
  const setCheckedProducts = useStore((state) => state.setCheckedProducts);
  const removeCheckedList = useStore((state) => state.removeCheckedList);

  const handleCheckedClose = (idx: number) => {
    const newProducts = checkedProducts.filter((_, index: number) => (
      index !== idx
    ));
    setCheckedProducts(newProducts);
    const newList = newProducts.map((product) => (
      product.id
    ));
    removeCheckedList(newList);
    remove(idx);
  };

  const { remove } = useFieldArray({
    control,
    name: "contents",
  });

  const TdStyle = "p-1 px-3 ";

  return (
    <tr key={product.id} className="border-b h-12">
      <td className={`${TdStyle}`}>
        <input
          style={{ display: "none" }}
          value={product.id}
          {...register(`contents.${idx}.productId`)}
        />
        <input
          style={{ display: "none" }}
          value={product.skus && product?.skus[0]?.id ? product?.skus[0]?.id : ""}
          {...register(`contents.${idx}.skuId`)}
        />
        <input
          style={{ display: "none" }}
          value={product?.skus &&
            product?.skus[stockPlaceId] ?
            product?.skus[stockPlaceId].stock : 0
          }
          {...register(`contents.${idx}.stock`)}
        />
        <div>{product.product_number}</div>
        <div>{product.product_name}</div>
      </td>
      <td className={`${TdStyle}`}>
        <div>{product.color_number}</div>
        <div>{product.color_name}</div>
      </td>
      <td className={`${TdStyle} text-center`}>{product.size}</td>
      <td className={`${TdStyle}`}>{product.categories?.category_name}</td>
      <td className={`${TdStyle}`}>{product.suppliers?.supplier_name}</td>
      <td className={`${TdStyle} text-right`}>{product.price}</td>
      <td className={`${TdStyle} text-right`}>
        {product.skus && product?.skus[0]?.stock ? product?.skus[0]?.stock : 0}
      </td>
      <td className={`${TdStyle}`}>
        <Input
          type="number"
          className="w-32"
          required={true}
          register={{ ...register(`contents.${idx}.quantity`, { required: true, min: 0.01 }) }}
        />
      </td>
      <td>
        <div className="flex justify-center">
          <AiOutlineClose className="cursor-pointer"
            onClick={() => handleCheckedClose(idx)} />
        </div>
      </td>
    </tr>
  );
};

export default OrderTableRow;