"use client";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { EditedProduct } from "@/types";
import { useStore } from "@/store";
import Button from "@/components/ui/Button";

type Props = {
  defaultValues: EditedProduct;
  id?: string;
  pageType: "NEW" | "EDIT";
};

const ProductForm: FC<Props> = ({ defaultValues, id = "", pageType }) => {
  const suppliers = useStore((state) => state.suppliers);
  const categories = useStore((state) => state.categories);
  const stockPlaces = useStore((state) => state.stockPlaces);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditedProduct>({
    defaultValues,
  });
  const onSubmit: SubmitHandler<EditedProduct> = async (data) => {
    switch (pageType) {
      case "NEW":
        await addProduct(data);
        return;
      case "EDIT":
        await updateProduct(data, id);
        return;
    }
  };

  const addProduct = async (data: EditedProduct) => {
    const { data: product, error } = await supabase
      .from("products")
      .insert({
        use_type: data.use_type,
        category_id: data.category_id,
        product_number: data.product_number.trim(),
        product_name: data.product_name.trim(),
        size: data.size.trim(),
        price: Number(data.price),
        color_number: data.color_number.trim(),
        color_name: data.color_name.trim(),
        supplier_id: data.supplier_id,
        lot_number: "",
      })
      .select("*")
      .single();

    if (error) {
      console.log(error);
      return;
    }

    if (product) {
      stockPlaces.filter(async (place) => {
        await supabase.from("skus").insert({
          product_id: product?.id,
          stock_place_id: place.id,
        });
      });
    }

    router.refresh();
    reset();
  };

  const updateProduct = async (data: EditedProduct, id: string) => {
    const { data: product, error } = await supabase
      .from("products")
      .update({
        use_type: data.use_type,
        category_id: data.category_id,
        product_number: data.product_number.trim(),
        product_name: data.product_name.trim(),
        size: data.size.trim(),
        price: Number(data.price),
        color_number: data.color_number.trim(),
        color_name: data.color_name.trim(),
        supplier_id: data.supplier_id,
        lot_number: "",
      })
      .eq("id", id);
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[calc(450px)] pb-6"
    >
      <div className="flex flex-col gap-6">
        <h2 className="font-bold">登録</h2>
        <div className="flex gap-3">
          <div className="flex gap-1">
            <input
              type="radio"
              id="ready"
              value="READY"
              {...register("use_type", { required: true })}
            />
            <label htmlFor="ready" className="cursor-pointer">
              既製品用
            </label>
          </div>
          <div className="flex gap-1">
            <input
              type="radio"
              id="custom"
              value="CUSTOM"
              {...register("use_type", { required: true })}
            />
            <label htmlFor="custom" className="cursor-pointer">
              別注品用
            </label>
          </div>
        </div>
        <div>
          <Select
            label="カテゴリー"
            className="w-full"
            required={true}
            register={{ ...register("category_id", { required: true }) }}
          >
            {categories?.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </Select>
        </div>
        <div className="w-full">
          <Select
            label="仕入先"
            className="w-full"
            required={true}
            register={{ ...register("supplier_id", { required: true }) }}
          >
            {suppliers?.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.supplier_name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Input
            label="品番"
            className="w-full"
            required={true}
            register={{ ...register("product_number", { required: true }) }}
          />
        </div>
        <div>
          <Input
            label="商品名"
            className="w-full"
            required={true}
            register={{ ...register("product_name", { required: true }) }}
          />
        </div>
        <div className="flex gap-3">
          <div className="w-full">
            <Input
              label="カラー品番"
              className="w-full"
              register={{ ...register("color_number") }}
            />
          </div>
          <div className="w-full">
            <Input
              label="カラー品番"
              className="w-full"
              register={{ ...register("color_name") }}
            />
          </div>
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
              required={true}
              register={{ ...register("price", { required: true, min: 0.01 }) }}
            />
          </div>
        </div>
        <div>
          <Button type="submit" className="w-full">
            {pageType === "NEW" ? "登録" : "更新"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
