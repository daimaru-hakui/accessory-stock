"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import { Database } from "@/schema";
import { useStore } from "@/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { FC, useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type OrderDetail = Database["public"]["Tables"]["order_details"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  categories: { id: string; category_name: string; } | null;
  suppliers: { id: string; supplier_name: string; } | null;
  skus: { id: string; stock: number; }[] | null;
}

interface Order extends OrderDetail {
  products: ProductRow | null;
  stock_places: { id: number; stock_place_name: string; } | null;
}

interface Props {
  order: Order;
}

type Inputs = {
  id: number;
  price: number;
  quantity: number;
  stockPlace: number;
  incomingDate: string;
  remainingQuantity: number;
  comment: string;
};

const OrderConfirmModal: FC<Props> = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const initQuantity = order.quantity;
  const stockPlaces = useStore((state) => state.stockPlaces);
  const [stockPlaceId, setStockPlaceId] = useState<number>(order.stock_place_id);
  const [prevStock, setPrevStock] = useState(0);
  const supabase = createClientComponentClient<Database>();
  const session = useStore((state) => state.session);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const router = useRouter();

  useEffect(() => {
    const getSku = async () => {
      const { data, error } = await supabase
        .from("skus")
        .select("stock")
        .eq("product_id", order.product_id)
        .eq("stock_place_id", stockPlaceId)
        .single();
      if (!data) return;
      if (error) {
        console.log(error);
      }
      setPrevStock(data.stock);
    };
    getSku();
  }, [order, supabase, stockPlaceId]);

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
      price: order.price,
      quantity: order.quantity,
      incomingDate: order.availability_date,
      comment: order.comment,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    await addIncommingHistory(data);
    await updateOrderHistory(data);
    await updateSku(data);
    setIsOpen(false);
    setIsLoading(false);
    router.refresh();
  };

  const addIncommingHistory = async (data: Inputs) => {
    if (!order) return;
    const { data: incoming, error } = await supabase
      .from("incoming_details")
      .insert({
        order_detail_id: order.id,
        incoming_date: data.incomingDate,
        quantity: Number(data.quantity),
        price: data.price,
        create_user: session?.user.id || "",
        comment: data.comment,
        stock_place_id: stockPlaceId
      });
    if (error) {
      console.log(error);
      return;
    }
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
    setValue("quantity", Number(data.remainingQuantity));
  };

  const updateSku = async (data: Inputs) => {
    const { data: sku, error } = await supabase
      .from("skus")
      .update({
        stock: prevStock + Number(data.quantity),
      })
      .eq("product_id", order.product_id)
      .eq("stock_place_id", stockPlaceId).select("stock");
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
              <div className="font-bold text-xs">入荷予定</div>
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
                      defaultValue={order.quantity}
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
                      defaultValue={order.price}
                      register={{
                        ...register("price", { required: true, min: 0.01 }),
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-full">
                    <Select
                      label="入庫場所"
                      className="w-full min-w-[calc(150px)]"
                      onChange={(e) => setStockPlaceId(e.target.value)}
                    >
                      {stockPlaces.map((place) => (
                        <option key={place.id} value={place.id}>
                          {place.stock_place_name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-full">
                    <Input
                      label="入荷日"
                      type="date"
                      className="w-full"
                      register={{ ...register("incomingDate") }}
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

export default React.memo(OrderConfirmModal);
