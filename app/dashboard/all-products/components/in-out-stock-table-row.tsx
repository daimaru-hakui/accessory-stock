import Input from '@/components/ui/input';
import { Database } from '@/schema';
import React, { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  skus: { id: string; stock: number; }[] | null;
  suppliers: { id: string; supplier_name: string; } | null;
  categories: { id: string; category_name: string; } | null;
}
interface Props {
  product: ProductRow;
  register: UseFormRegister<Inputs>;
  idx: number;
  stockPlaceId: number;
}

type Inputs = {
  contents: {
    productId: string;
    skuId: string;
    stock: number;
    quantity: number;
    arrivalDate: string;
  }[];
};

const IncommingTableRow: FC<Props> = ({ product, register, idx, stockPlaceId }) => {

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
      <td className={`${TdStyle}`}>
        <Input type="date"
          register={{ ...register(`contents.${idx}.arrivalDate`) }}
        />
      </td>
    </tr>
  );
};

export default IncommingTableRow;