import Button from "@/components/ui/Button";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import { Database } from "@/schema";
import { useStore } from "@/store";
import React, { useState, FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InOutStockTableRow from "./in-out-stock-table-row";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  skus: { id: string; stock: number; }[] | null;
  suppliers: { id: string; supplier_name: string; } | null;
  categories: { id: string; category_name: string; } | null;
}
interface Props {
  pageType: "IN" | "OUT";
}

type Inputs = {
  contents: {
    productId: string;
    skuId: string;
    stock: number;
    quantity: number;
    arrivalDate: string;
  }[];
};

const InOutStockTableModal: FC<Props> = ({
  pageType,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const checkedProducts = useStore((state) => state.checkedProducts);
  const supabase = createClientComponentClient<Database>();
  const stockPlaces = useStore((state) => state.stockPlaces);
  const [stockPlaceId, setStockPlaceId] = useState<number>(0);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    switch (pageType) {
      case "IN":
        await incommingUpdateStock(data);
        break;
      case "OUT":
        await outgoingUpdateStock(data);
        break;
    }
    reset();
    setIsOpen(false);
    router.refresh();
  };

  const incommingUpdateStock = async (data: Inputs) => {
    data.contents.forEach(async (content) => {
      await supabase
        .from("skus")
        .update({
          stock: Number(content.stock) + (Number(content.quantity) || 0),
        })
        .eq("id", content.skuId);
    });
  };

  const outgoingUpdateStock = async (data: Inputs) => {
    data.contents.forEach(async (content) => {
      await supabase
        .from("skus")
        .update({
          stock: Number(content.stock) - (Number(content.quantity) || 0),
        })
        .eq("id", content.skuId);
    });
  };

  const ThStyle = "p-1 px-3 w-auto";

  return (
    <>
      <Button
        colorScheme={pageType === "IN" ? "green" : "orange"}
        className="cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {pageType === "IN" ? "入庫" : "出庫"}
      </Button>
      <Modal
        title={pageType === "IN" ? "入庫" : "出庫"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeButton={false}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Select
            label={pageType === "IN" ? "入庫場所" : "出庫場所"}
            className="min-w-[calc(150px)]"
            onChange={(e) => setStockPlaceId(e.target.value)}
          >
            {stockPlaces.map((place) => (
              <option key={place.id} value={place.id}>
                {place.stock_place_name}
              </option>
            ))}
          </Select>
          <table className="w-full mt-3">
            <thead className="text-left text-xs">
              <tr className="border-b h-12">
                <th className={`${ThStyle}`}>品番/品名</th>
                <th className={`${ThStyle}`}>カラー</th>
                <th className={`${ThStyle}`}>サイズ</th>
                <th className={`${ThStyle}`}>カテゴリー</th>
                <th className={`${ThStyle}`}>仕入先</th>
                <th className={`${ThStyle}`}>価格</th>
                <th className={`${ThStyle} text-right`}>徳島在庫</th>
                <th className={`${ThStyle}`}>数量</th>
                <th className={`${ThStyle}`}>
                  {pageType === "IN" ? "入荷日" : "出荷日"}
                </th>
                <th className={`${ThStyle} text-center`}>アクション</th>
              </tr>
            </thead>
            <tbody>
              {checkedProducts.map((product, idx) => (
                <InOutStockTableRow
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
              onClick={() => setIsOpen(false)}
            >
              閉じる
            </Button>
            <Button type="submit" colorScheme="blue" className="mt-6">
              登録
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default InOutStockTableModal;
