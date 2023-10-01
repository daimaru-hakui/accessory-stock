import { Database } from "@/schema";
import React, { FC } from "react";
import OutgoingTableRow from "./outgoing-table-row";

type IncomingDetail = Database["public"]["Tables"]["incoming_details"]["Row"];
type OutgoingDetail = Database["public"]["Tables"]["outgoing_details"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];
type StockPlace = Database["public"]["Tables"]["stock_places"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];
type Supplier = Database["public"]["Tables"]["suppliers"]["Row"];

interface Products extends Product {
  categories: Category | null;
  suppliers: Supplier | null;
}

interface Incoming extends IncomingDetail {
  products: Products | null;
  stock_places: StockPlace | null;
}

interface Outgoing extends OutgoingDetail {
  products: Products | null;
  stock_places: StockPlace | null;
}

interface Props {
  outgoingDetails: Outgoing[];
}

const OutgoingDetails: FC<Props> = ({ outgoingDetails }) => {
 
  const ThStyle = "p-1";

  return (
    <div className="overflow-auto max-h-[calc(100vh-110px)]">
      <table className="w-full min-w-[calc(1100px)]">
        <thead className="text-left text-xs sticky top-0 bg-zinc-50">
          <tr className="border-b h-12">
            <th className={`${ThStyle}`}>出庫日</th>
            <th className={`${ThStyle}`}>既成/別注</th>
            <th className={`${ThStyle}`}>品番/品名</th>
            <th className={`${ThStyle}`}>カラー</th>
            <th className={`${ThStyle} `}>サイズ</th>
            <th className={`${ThStyle}`}>カテゴリー</th>
            <th className={`${ThStyle}`}>仕入先</th>
            <th className={`${ThStyle} text-center`}>価格</th>
            <th className={`${ThStyle} text-center`}>数量</th>
            <th className={`${ThStyle} text-center`}>合計</th>
            <th className={`${ThStyle}`}>コメント</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {outgoingDetails?.map((outgoingDetail) => (
            <OutgoingTableRow
              key={outgoingDetail.id}
              outgoingDetail={outgoingDetail}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OutgoingDetails;
