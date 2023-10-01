import { Database } from '@/schema';
import { format } from 'date-fns';
import React, { FC } from 'react';

type outgoingDetail = Database["public"]["Tables"]["incoming_details"]["Row"];
type OutgoingDetail = Database["public"]["Tables"]["outgoing_details"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];
type StockPlace = Database["public"]["Tables"]["stock_places"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];
type Supplier = Database["public"]["Tables"]["suppliers"]["Row"];

interface ProductRow extends Product {
  categories: Category | null;
  suppliers: Supplier | null;
}

interface Incoming extends outgoingDetail {
  products: ProductRow | null;
  stock_places: StockPlace | null;
}

interface Outgoing extends OutgoingDetail {
  products: ProductRow | null;
  stock_places: StockPlace | null;
}

interface Props {
  outgoingDetail: Outgoing;
}

const OutgoingTableRow: FC<Props> = ({ outgoingDetail }) => {

  const TdStyle = "p-1 px-3 ";
  return (
    <tr key={outgoingDetail.id} className="border-b h-12">
      <td className={`${TdStyle}`}>
        {outgoingDetail.outgoing_date}
      </td>
      <td className={`${TdStyle}`}>
        {outgoingDetail.products?.use_type === "READY" ? "既成" : "別注"}
      </td>
      <td className={`${TdStyle}`}>
        <div>{outgoingDetail.products?.product_number}</div>
        <div>{outgoingDetail.products?.product_name}</div>
      </td>
      <td className={`${TdStyle}`}>
        <div>{outgoingDetail.products?.color_number}</div>
        <div>{outgoingDetail.products?.color_name}</div>
      </td>
      <td className={`${TdStyle}`}>
        {outgoingDetail.products?.size}
      </td>
      <td className={`${TdStyle}`}>
        {outgoingDetail.products?.categories?.category_name}
      </td>
      <td className={`${TdStyle}`}>
        {outgoingDetail.products?.suppliers?.supplier_name}
      </td>
      <td className={`${TdStyle} text-right`}>
        {outgoingDetail.products?.price}
      </td>
      <td className={`${TdStyle} text-right`}>
        {outgoingDetail.quantity}
      </td>
      <td className={`${TdStyle} text-right`}>
        {((outgoingDetail.products?.price || 0) * outgoingDetail.quantity)
          .toLocaleString("ja-JP")}円
      </td>
      <td className={`${TdStyle}`}>
        {outgoingDetail.comment}
      </td>

    </tr >
  );
};

export default OutgoingTableRow;