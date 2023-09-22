"use client";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Button from "@/components/ui/Button";
import { Database } from "@/schema";
import { useRouter } from "next/navigation";

type Color = Database["public"]["Tables"]["colors"]["Row"];
type Supplier = Database["public"]["Tables"]["suppliers"]["Row"];
type Categorie = Database["public"]["Tables"]["categories"]["Row"];

type Inputs = {
  productName: string;
  productNumber: string;
  category: string;
  colorNumber: string;
  color: string;
  size: string;
  supplier: string;
  price: number | string;
};

type Props = {
  colors: Color[] | null;
  suppliers: Supplier[] | null;
  categories: Categorie[] | null;
};

const ProductForm: FC<Props> = ({ colors, suppliers, categories }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // console.log(data);
    await createProduct(data);
  };

  const createProduct = async (data: Inputs) => {
    const { data: product, error } = await supabase.from("products").insert({
      productNumber: data.productNumber,
      productName: data.productName,
      color_number: data.colorNumber,
      category_id: data.category,
      size: data.size,
      price: Number(data.price),
      lot_number: "22",
      color_id: data.color,
      supplier_id: data.supplier,
    });

    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      router.refresh();
      reset();
    }
  };

  console.log(colors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 border w-full max-w-[calc(450px)] bg-white"
    >
      <div className="flex flex-col gap-6">
        <h2 className="font-bold">登録</h2>
        <div>
          <Input
            label="品番"
            className="w-full"
            register={{ ...register("productNumber") }}
          />
        </div>
        <div>
          <Input
            label="商品名"
            className="w-full"
            register={{ ...register("productName") }}
          />
        </div>
        <div>
          <Select
            label="カテゴリー"
            className="w-full"
            register={{ ...register("category") }}
          >
            {categories?.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex gap-3">
          <div className="w-full">
            <Input
              label="カラー品番"
              className="w-full"
              register={{ ...register("colorNumber") }}
            />
          </div>
          <div className="w-full">
            <Select
              label="カラー"
              className="w-full"
              register={{ ...register("color") }}
            >
              {colors?.map((color: any) => (
                <option key={color.id} value={color.id}>
                  {color.color_name}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="w-full">
          <Select
            label="仕入先"
            className="w-full"
            register={{ ...register("supplier") }}
          >
            {suppliers?.map((supplier: any) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.supplier_name}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex gap-3">
          <div>
            <Input
              label="サイズ"
              className="w-full"
              register={{ ...register("size") }}
            />
          </div>
          <div>
            <Input
              label="単価"
              type="number"
              className="w-full"
              register={{ ...register("price", { min: 0.01 }) }}
            />
          </div>
        </div>
        <div>
          <Button type="submit" className="w-full">
            登録
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
