import { create } from "zustand";
import { Session } from "@supabase/supabase-js";
import { Database } from "@/schema";

type Supplier = Database["public"]["Tables"]["suppliers"]["Row"];
type Categorie = Database["public"]["Tables"]["categories"]["Row"];

type Store = {
  session: Session | null;
  setSession: (session: Session) => void;
  isSidebar: boolean;
  toggleSidebar: (isSidebar: boolean) => void;
  suppliers: Supplier[];
  setSuppliers: (suppliers: Supplier[]) => void;
  categories: Categorie[];
  setCategories: (categories: Categorie[]) => void;
  checkList: string[];
  setCheckList: (checkList: string[]) => void;
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
  checkList: [],
  setCheckList: (checkList) => set({ checkList })
}));
