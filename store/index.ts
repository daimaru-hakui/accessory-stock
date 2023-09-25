import { create } from "zustand";
import { Session } from "@supabase/supabase-js";
import { Database } from "@/schema";

type Supplier = Database["public"]["Tables"]["suppliers"]["Row"];
type Categorie = Database["public"]["Tables"]["categories"]["Row"];
type StcokPlace = Database["public"]["Tables"]["stock_places"]["Row"];

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductRow extends Product {
  skus: { id: string; stock: number; }[] | null;
  suppliers: { id: string; supplier_name: string; } | null;
  categories: { id: string; category_name: string; } | null;
}


type Store = {
  session: Session | null;
  setSession: (session: Session) => void;
  isSidebar: boolean;
  toggleSidebar: (isSidebar: boolean) => void;
  suppliers: Supplier[];
  setSuppliers: (suppliers: Supplier[]) => void;
  categories: Categorie[];
  setCategories: (categories: Categorie[]) => void;
  stockPlaces: StcokPlace[];
  setStockPlaces: (stockPlaces: StcokPlace[]) => void;
  checkedProducts: ProductRow[];
  setCheckedProducts: (checkedProducts: ProductRow[]) => void;
  checkedList: string[];
  setCheckedList: (checkedList: string[]) => void;
  removeCheckedList: (checkedList: string[]) => void;
  resetCheckedList: () => void;
};

export const useStore = create<Store>((set) => ({
  session: null,
  setSession: (session) => set(() => ({ session: session })),
  isSidebar: true,
  toggleSidebar: (isSidebar) => set(() => ({ isSidebar: !isSidebar })),
  suppliers: [],
  setSuppliers: (suppliers) => set({ suppliers }),
  categories: [],
  setCategories: (categories) => set({ categories }),
  stockPlaces: [],
  setStockPlaces: (stockPlaces) => set({ stockPlaces }),
  checkedProducts: [],
  setCheckedProducts: (checkedProducts) => set({ checkedProducts }),
  checkedList: [],
  setCheckedList: (checkedList) =>
    set((state) => ({ checkedList: [...state.checkedList, ...checkedList] })),
  removeCheckedList: (checkedList) => set({ checkedList }),
  resetCheckedList: () => set({ checkedList: [] })
}));
