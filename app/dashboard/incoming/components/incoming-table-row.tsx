import { Database } from '@/schema';
import React, { FC } from 'react';

type IncomingDetail = Database["public"]["Tables"]["incoming_details"]["Row"];
type OrderDetail = Database["public"]["Tables"]["order_details"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];
type StockPlace = Database["public"]["Tables"]["stock_places"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];
type Supplier = Database["public"]["Tables"]["suppliers"]["Row"];

interface ProductRow extends Product {
  categories: Category | null;
  suppliers: Supplier | null;
}

interface Order extends OrderDetail {
  products: ProductRow | null;
}

interface Incoming extends IncomingDetail {
  order_details: Order | null;
  stock_places: StockPlace | null;
}

interface Props {
  incomingDetail: Incoming;
}

const IncomingTableRow: FC<Props> = ({ incomingDetail }) => {

  const TdStyle = "p-1 px-3 ";
  return (
    <tr key={incomingDetail.id} className="border-b h-12">
      <td className={`${TdStyle}`}>
        {incomingDetail.order_details?.order_id}
      </td>
      <td className={`${TdStyle}`}>
        {incomingDetail.order_details?.order_date}
      </td>
      <td className={`${TdStyle}`}>
        {incomingDetail.incoming_date}
      </td>
      <td className={`${TdStyle}`}>
        {incomingDetail.order_details?.products?.use_type === "READY" ? "既成" : "別注"}
      </td>
      <td className={`${TdStyle}`}>
        <div>{incomingDetail.order_details?.products?.product_number}</div>
        <div>{incomingDetail.order_details?.products?.product_name}</div>
      </td>
      <td className={`${TdStyle}`}>
        <div>{incomingDetail.order_details?.products?.color_number}</div>
        <div>{incomingDetail.order_details?.products?.color_name}</div>
      </td>
      <td className={`${TdStyle}`}>
        {incomingDetail.order_details?.products?.size}
      </td>
      <td className={`${TdStyle}`}>
        {incomingDetail.order_details?.products?.categories?.category_name}
      </td>
      <td className={`${TdStyle}`}>
        {incomingDetail.order_details?.products?.suppliers?.supplier_name}
      </td>
      <td className={`${TdStyle} text-right`}>
        {incomingDetail.price}
      </td>
      <td className={`${TdStyle} text-right`}>
        {incomingDetail.quantity}
      </td>
      <td className={`${TdStyle} text-right`}>
        {incomingDetail.comment}
      </td>

    </tr >
  );
};

export default IncomingTableRow;