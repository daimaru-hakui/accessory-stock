import { create } from "zustand";
import { Session } from "@supabase/supabase-js";
import { Database } from "@/schema";

type Supplier = Database["public"]["Tables"]["suppliers"]["Row"];
type Categorie = Database["public"]["Tables"]["categories"]["Row"];
type StockPlace = Database["public"]["Tables"]["stock_places"]["Row"];
type OrderDetail = Database["public"]["Tables"]["order_details"]["Row"];

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  skus: { id: string; stock: number; }[] | null;
  suppliers: { id: string; supplier_name: string; } | null;
  categories: { id: string; category_name: string; } | null;
}

interface Order extends OrderDetail {
  products: ProductRow | null;
  stock_places: { id: number; stock_place_name: string; } | null;
}


type Store = {
  session: Session | null;
  setSession: (session: Session) => void;
  isSidebar: boolean;
  toggleSidebar: () => void;
  isLoading: boolean;
  setIsLoading: (bool: boolean) => void;
  suppliers: Supplier[];
  setSuppliers: (suppliers: Supplier[]) => void;
  categories: Categorie[];
  setCategories: (categories: Categorie[]) => void;
  stockPlaces: StockPlace[];
  setStockPlaces: (stockPlaces: StockPlace[]) => void;
  checkedProducts: ProductRow[];
  setCheckedProducts: (checkedProducts: ProductRow[]) => void;
  checkedOrders: Order[];
  setCheckedOrders: (checkedOrders: Order[]) => void;
};

export const useStore = create<Store>((set) => ({
  session: null,
  setSession: (session) => set(() => ({ session: session })),
  isLoading: false,
  setIsLoading: (bool) => set({ isLoading: bool }),
  isSidebar: true,
  toggleSidebar: () => set((state) => ({ isSidebar: !state.isSidebar })),
  suppliers: [],
  setSuppliers: (suppliers) => set({ suppliers }),
  categories: [],
  setCategories: (categories) => set({ categories }),
  stockPlaces: [],
  setStockPlaces: (stockPlaces) => set({ stockPlaces }),
  checkedProducts: [],
  setCheckedProducts: (checkedProducts) => set({ checkedProducts }),
  checkedOrders: [],
  setCheckedOrders: (checkedOrders) => set({ checkedOrders }),
}));
