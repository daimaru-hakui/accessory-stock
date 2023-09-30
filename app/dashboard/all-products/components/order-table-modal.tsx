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
import OrderTableRow from "./order-table-row";
import { format } from "date-fns";

type Inputs = {
  availabilityDate: string;
  orderDate: string;
  contents: {
    productId: string;
    skuId: string;
    stock: number;
    quantity: number;
    price: number;
    comment: string;
  }[];
};

const OrderTableModal: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const session = useStore((state) => state.session);
  const checkedProducts = useStore((state) => state.checkedProducts);
  const supabase = createClientComponentClient<Database>();
  const stockPlaces = useStore((state) => state.stockPlaces);
  const [stockPlaceId, setStockPlaceId] = useState<number>(0);
  const now = new Date();
  const today = format(now, "yyyy-MM-dd");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const id = await addOrderId();
    if (!id) return;
    await addOrderDetails(data, id);
    reset();
    setIsOpen(false);
    router.refresh();
  };

  const addOrderId = async () => {
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        create_user: session?.user.id || "",
      }).select("id").single();
    if (error) {
      console.log(error);
      return;
    }
    if (!order) return;
    return order.id;
  };

  const addOrderDetails = async (data: Inputs, id: number) => {
    const newData = data.contents.map((content) => ({
      order_id: id,
      product_id: content.productId,
      order_quantity: Number(content.quantity),
      quantity: Number(content.quantity),
      create_user: session?.user.id || "",
      order_date: data.orderDate,
      availability_date: data.availabilityDate,
      stock_place_id: stockPlaceId,
      comment: content.comment
    }));
    const { data: order, error } = await supabase
      .from("order_details")
      .insert(newData);
    if (error) {
      console.log(error);
      return;
    }
  };

  const ThStyle = "p-1 px-3 w-auto";

  return (
    <>
      <Button
        colorScheme="green"
        className="cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        発注
      </Button>
      <Modal
        title="発注"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeButton={false}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
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
                label="発注日"
                type="date"
                defaultValue={today}
                register={{ ...register("orderDate", { required: true }) }}
              />
            </div>
            <div>
              <Input
                label="入荷予定日"
                type="date"
                register={{
                  ...register("availabilityDate", { required: true }),
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
                <th className={`${ThStyle}`}>マスター価格</th>
                <th className={`${ThStyle}`}>価格</th>
                <th className={`${ThStyle} text-right`}>徳島在庫</th>
                <th className={`${ThStyle}`}>数量</th>
                <th className={`${ThStyle}`}>コメント</th>
                <th className={`${ThStyle} text-center`}>削除</th>
              </tr>
            </thead>
            <tbody>
              {checkedProducts.map((product, idx) => (
                <OrderTableRow
                  key={product.id}
                  product={product}
                  stockPlaceId={stockPlaceId}
                  register={register}
                  control={control}
                  idx={idx}
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

export default OrderTableModal;
