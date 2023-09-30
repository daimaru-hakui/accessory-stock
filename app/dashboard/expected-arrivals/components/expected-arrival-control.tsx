import React, { FC, SetStateAction } from "react";
import { useStore } from "@/store";
import Button from "@/components/ui/Button";
import { Database } from "@/schema";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import OrderTableModal from "../../all-products/components/order-table-modal";
import OutgoingTableModal from "../../all-products/components/outgoing-table-modal";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  skus: { id: string; stock: number; }[] | null;
  suppliers: { id: string; supplier_name: string; } | null;
  categories: { id: string; category_name: string; } | null;
}

interface Props {
  setAllCheck: React.Dispatch<SetStateAction<"ADD" | "REMOVE" | null>>;
}

const ExpectedArrivalControl: FC<Props> = ({ setAllCheck }) => {
  const checkedProducts = useStore((state) => state.checkedProducts);
  const checkedList = useStore((state) => state.checkedList);

  return (
    <div className="h-8">
      {checkedProducts && checkedList.length > 0 && (
        <div className="flex justify-between gap-3">
          <div className="flex gap-3">
            <OrderTableModal />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpectedArrivalControl;
