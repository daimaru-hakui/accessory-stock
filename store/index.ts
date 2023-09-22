import { create } from "zustand";
import { Session } from "@supabase/supabase-js";

type Store = {
  session: Session | null;
  setSession: (session: Session) => void;
  isSidebar: boolean;
  toggleSidebar: (isSidebar:boolean) => void;
};

export const useStore = create<Store>((set) => ({
  session: null,
  setSession: (session) => set(() => ({ session: session })),
  isSidebar: true,
  toggleSidebar: (isSidebar) => set(() => ({ isSidebar: !isSidebar })),
}));
