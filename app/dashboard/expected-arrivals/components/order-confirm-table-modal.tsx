"use client";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import { Database } from "@/schema";
import { useStore } from "@/store";
import React, { useState, FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import { format } from "date-fns";
import OrderConfirmTableRow from "./order-confirm-table-row";

type Inputs = {
  incomingDate: string;
  stockPlace: number;
  contents: {
    id: number;
    price: number;
    availabilityDate: string;
    quantity: number;
    remainingQuantity: number;
    comment: string;
    productId: string;
    prevStock: number;
  }[];
};

const OrderConfirmTableModal: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const session = useStore((state) => state.session);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const checkedOrders = useStore((state) => state.checkedOrders);
  const supabase = createClientComponentClient<Database>();
  const stockPlaces = useStore((state) => state.stockPlaces);
  const [stockPlaceId, setStockPlaceId] = useState<number>(0);
  const now = new Date();
  const today = format(now, "yyyy-MM-dd");

  const mothods
   = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true)
    await addIncomingDetails(data);
    await updateOrderHistories(data)
    await updateSkus(data)
    mothods.reset();
    setIsLoading(false)
    setIsOpen(false);
    router.refresh();
  };

  const addIncomingDetails = async (data: Inputs) => {
    const newData = data.contents.map((content) => ({
      incoming_date: data.incomingDate,
      stock_place_id: stockPlaceId,
      create_user: session?.user.id || "",
      order_detail_id: content.id,
      price: Number(content.price),
      quantity: Number(content.quantity),
      comment: content.comment,
    }));
    const { data: order, error } = await supabase
      .from("incoming_details")
      .insert(newData);
    if (error) {
      console.log(error);
      return;
    }
  };

  const updateOrderHistories = async (data: Inputs) => {
    data.contents.forEach(async(content,idx) => {
      const { data: order, error } = await supabase
        .from("order_details")
        .update({
          quantity: Number(content.remainingQuantity)
        })
        .eq("id", content.id);
      if (error) {
        console.log(error);
        return;
      }
      mothods.setValue(`contents.${idx}.remainingQuantity`,Number(content.remainingQuantity))
    })
  };

  const updateSkus = async (data: Inputs) => {
    data.contents.forEach(async (content, idx) => {
      const { data: sku, error } = await supabase
        .from("skus")
        .update({
          stock: Number(content.prevStock) + Number(content.quantity),
        })
        .eq("product_id", content.productId)
        .eq("stock_place_id", stockPlaceId);
      if (error) {
        console.log(error);
        return;
      }
    })
  };

  const ThStyle = "p-1 px-3 w-auto";

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
      >
        <form onSubmit={mothods.handleSubmit(onSubmit)}>
          <div className="flex gap-3">
            <div>
              <Select
                label="入庫場所"
                className="min-w-[calc(150px)]"
                onChange={(e) => setStockPlaceId(e.target.value)}
              >
                {stockPlaces.map((place) => (
                  <option key={place.id} value={place.id}>
                    {place.stock_place_name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Input
                label="入荷日"
                type="date"
                defaultValue={today}
                register={{
                  ...mothods.register("incomingDate", { required: true }),
                }}
              />
            </div>
          </div>
          <table className="w-full mt-3">
            <thead className="text-left text-xs">
              <tr className="border-b h-12">
                <th className={`${ThStyle}`}>品番/品名</th>
                <th className={`${ThStyle}`}>カラー</th>
                <th className={`${ThStyle}`}>サイズ</th>
                <th className={`${ThStyle}`}>カテゴリー</th>
                <th className={`${ThStyle}`}>仕入先</th>
                <th className={`${ThStyle}`}>価格</th>
                <th className={`${ThStyle}`}>入荷予定</th>
                <th className={`${ThStyle}`}>入荷数量</th>
                <th className={`${ThStyle}`}>残数量</th>
                <th className={`${ThStyle}`}>コメント</th>
                <th className={`${ThStyle} text-center`}>削除</th>
              </tr>
            </thead>
            <tbody>
              {checkedOrders.map((order, idx) => (
                <OrderConfirmTableRow
                  key={order.id}
                  order={order}
                  mothods={mothods}
                  idx={idx}
                  stockPlaceId={stockPlaceId}
                />
              ))}
            </tbody>
          </table>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              className="mt-6"
              colorScheme="gray"
              onClick={() => setIsOpen(false)}
            >
              閉じる
            </Button>
            <Button type="submit" className="mt-6">
              登録
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default OrderConfirmTableModal;
