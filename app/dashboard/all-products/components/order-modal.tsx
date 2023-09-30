"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import { Database } from "@/schema";
import { useStore } from "@/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useState, FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import format from "date-fns/format";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  skus: { id: string; stock: number; }[] | null;
  suppliers: { id: string; supplier_name: string; } | null;
  categories: { id: string; category_name: string; } | null;
}

interface Props {
  product: ProductRow;
}

type Inputs = {
  availabilityDate: string;
  orderDate: string;
  skuId: string;
  stock: number;
  quantity: number;
  price: number;
  comment: string;
};

const OrderModal: FC<Props> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const session = useStore((state) => state.session);
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
    await addOrderDetail(data, id);
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

  const addOrderDetail = async (data: Inputs, id: number) => {
    const { data: order, error } = await supabase
      .from("order_details")
      .insert({
        order_id: id,
        product_id: product.id,
        create_user: session?.user.id || "",
        price: Number(data.price),
        quantity: Number(data.quantity),
        order_date: data.orderDate,
        availability_date: data.availabilityDate,
        comment: data.comment,
        stock_place_id: stockPlaceId,
      });
    if (error) {
      console.log(error);
      return;
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        発注
      </Button>
      <Modal title="発注" isOpen={isOpen} setIsOpen={setIsOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6 flex flex-col gap-6">
            <div>
              <div className="text-xs font-bold flex">品番/品名</div>
              <div>
                {product.product_number}
                <span className="ml-3">{product.product_name}</span>
              </div>
            </div>
            <div>
              <div className="text-xs font-bold">カラー</div>
              {product.color_number}
              <span className="ml-3">{product.color_name}</span>
            </div>
            <div>
              <div className="text-xs font-bold flex">サイズ</div>
              <div>{product.size}</div>
            </div>
            <div>
              <div className="text-xs font-bold">カテゴリー</div>
              <div>{product.categories?.category_name}</div>
            </div>
            <div>
              <div className="text-xs font-bold">仕入先</div>
              <div>{product.suppliers?.supplier_name}</div>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
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
              <div>
                <Input
                  label="発注日"
                  className="w-full"
                  type="date"
                  defaultValue={today}
                  register={{ ...register("orderDate", { required: true }) }}
                />
              </div>
              <div>
                <Input
                  label="入荷日"
                  className="w-full"
                  type="date"
                  register={{
                    ...register("availabilityDate", { required: true }),
                  }}
                />
              </div>
            </div>
            <div className="w-full flex gap-3">
              <div>
                <Input
                  label="価格"
                  type="number"
                  required={true}
                  defaultValue={product.price}
                  register={{
                    ...register(`price`, {
                      required: true,
                      min: 0.01,
                    }),
                  }}
                />
              </div>
              <div>
                <Input
                  label="数量"
                  type="number"
                  required={true}
                  register={{
                    ...register(`quantity`, {
                      required: true,
                      min: 0.01,
                    }),
                  }}
                  defaultValue={0}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="text-xs font-bold">コメント</div>
              <textarea
                className="mt-1 p-2 w-full border border-zinc-300 rounded-md"
                {...register(`comment`)}
              />
            </div>
            <div className="w-full">
              <Button type="submit" className="w-full">
                登録
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default OrderModal;
