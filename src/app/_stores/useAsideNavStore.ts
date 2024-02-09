import { create } from "zustand";
import { persist } from "zustand/middleware";

type AsideNav = {
  hidden: boolean;
  updateHidden: (hidden: boolean) => void;
  salesOpen: boolean;
  updateSalesOpen: (salesOpen: boolean) => void;
};

export const useAsideNavStore = create<AsideNav>()(
  persist(
    (set) => ({
      hidden: true,
      updateHidden: (hidden) => set({ hidden }),
      salesOpen: false,
      updateSalesOpen: (salesOpen) => set({ salesOpen }),
    }),
    {
      name: "aside-nav", // name of the item in the storage (must be unique)
    },
  ),
);
