"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { Database } from "@/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { FC, useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type OrderDetails = Database["public"]["Tables"]["order_details"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];
type StockPlace = Database["public"]["Tables"]["stock_places"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];
type Supplier = Database["public"]["Tables"]["suppliers"]["Row"];

interface ProductRow extends Product {
  categories: Category | null;
  suppliers: Supplier | null;
}

interface Order extends OrderDetails {
  products: ProductRow | null;
  stock_places: StockPlace | null;
}

interface Props {
  order: Order;
}

type Inputs = {
  id: number;
  price: number;
  quantity: number;
  availabilityDate: string;
  remainingQuantity: number;
  comment: string;
};

const OrderConfirmModal: FC<Props> = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const initQuantity = order.quantity;
  const [prevStock, setPrevStock] = useState(0);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    const getSku = async () => {
      const { data } = await supabase
        .from("skus")
        .select("stock")
        .eq("product_id", order.product_id)
        .eq("stock_place_id", order.stock_place_id)
        .single();
      if (!data) return;
      setPrevStock(data.stock);
    };
    getSku();
  }, [order, supabase]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      id: order.id,
      price: order.products?.price,
      quantity: order.quantity,
      availabilityDate: order.availability_date,
      comment: order.comment,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    await addIncommingHistory(data);
    await updateOrderHistory(data);
    await updateSku(data);
    setIsOpen(false);
    router.refresh();
  };

  const addIncommingHistory = async (data: Inputs) => {
    const { data: incoming, error } = await supabase
      .from("incoming_details")
      .insert({
        product_id: order.product_id,
        order_number: order.order_id,
        order_date: order.order_date,
        incoming_date: data.availabilityDate,
        quantity: Number(data.quantity),
        create_user: null,
        stock_place_id: order.stock_place_id,
        comment: data.comment,
      });
    console.log(error);
  };

  const updateOrderHistory = async (data: Inputs) => {
    const { data: order, error } = await supabase
      .from("order_details")
      .update({
        quantity: Number(data.remainingQuantity),
      })
      .eq("id", data.id);
    if (error) {
      console.log(error);
      return;
    }
  };

  const updateSku = async (data: Inputs) => {
    const { data: sku, error } = await supabase
      .from("skus")
      .update({
        stock: prevStock + Number(data.quantity),
      })
      .eq("product_id", order.product_id)
      .eq("stock_place_id", order.stock_place_id);
    if (error) {
      console.log(error);
      return;
    }
  };

  return (
    <>
      <Button
        className="cursor-pointer"
        onClick={() => {
          setIsOpen(true);
          setPage(1);
        }}
      >
        確定
      </Button>
      <Modal
        title="確定"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeButton={false}
        reset={reset}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[calc(450px)] pb-6"
        >
          <div className="font-bold text-xs">商品名</div>
          <div className="ml-3">
            <div>
              {order.products?.product_number}
              <span className="ml-3">{order.products?.product_name}</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-6">
            <div>
              <div className="font-bold text-xs">発注数量</div>
              <span className="ml-3">{order.quantity}</span>
            </div>

            {page === 1 && (
              <>
                <div className="flex gap-3">
                  <div>
                    <Input
                      label="入荷数量"
                      type="number"
                      className="w-full"
                      required={true}
                      register={{
                        ...register("quantity", { required: true, min: 0.01 }),
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      label="単価"
                      type="number"
                      className="w-full"
                      required={true}
                      register={{
                        ...register("price", { required: true, min: 0.01 }),
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-full">
                    <Input
                      label="入荷日"
                      type="date"
                      className="w-full"
                      register={{ ...register("availabilityDate") }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold">コメント</div>
                  <textarea
                    defaultValue={order.comment}
                    className="mt-1 p-2 w-full border border-zinc-300	rounded-md"
                    {...register("comment")}
                  />
                </div>
                <div className="flex gap-3">
                  <div className="w-full">
                    <Button
                      type="button"
                      colorScheme="gray"
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      閉じる
                    </Button>
                  </div>
                  <div className="w-full">
                    <Button
                      type="button"
                      className="w-full"
                      onClick={() => {
                        setPage(2);
                        setValue(
                          "remainingQuantity",
                          initQuantity - watch("quantity") > 0
                            ? initQuantity - watch("quantity")
                            : 0
                        );
                      }}
                    >
                      次へ
                    </Button>
                  </div>
                </div>
              </>
            )}

            {page === 2 && (
              <>
                <div>
                  <div className="font-bold text-xs">入荷数量</div>
                  <span className="ml-3">{watch("quantity")}</span>
                </div>
                <div>
                  <Input
                    label="残数量"
                    type="number"
                    className="w-full"
                    required={true}
                    register={{
                      ...register("remainingQuantity", {
                        required: true,
                        min: 0,
                      }),
                    }}
                  />
                </div>
                <div className="flex gap-3">
                  <div className="w-full">
                    <Button
                      type="button"
                      colorScheme="gray"
                      variant="outline"
                      className="w-full"
                      onClick={() => setPage(1)}
                    >
                      戻る
                    </Button>
                  </div>
                  <div className="w-full">
                    <Button type="submit" className="w-full">
                      確定
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default OrderConfirmModal;
