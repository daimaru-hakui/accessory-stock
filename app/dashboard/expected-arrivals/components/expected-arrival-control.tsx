import React, { FC } from "react";
import { useStore } from "@/app/store";
import OrderConfirmTableModal from "./order-confirm-table-modal";

const ExpectedArrivalControl: FC = () => {
  const checkedOrders = useStore((state) => state.checkedOrders);

  return (
    <div className="h-8">
      {checkedOrders.length > 0 && (
        <div className="flex justify-between gap-3">
          <div className="flex gap-3">
            <OrderConfirmTableModal />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpectedArrivalControl;
