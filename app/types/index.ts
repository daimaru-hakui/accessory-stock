export type EditedProduct = {
  use_type: "READY" | "CUSTOM" | string;
  product_name: string;
  product_number: string;
  category_id: string;
  color_number: string;
  color_name: string;
  size: string;
  supplier_id: string;
  price: number | string;
  comment: string;
};