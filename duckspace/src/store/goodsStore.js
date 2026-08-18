import { create } from "zustand";

export const useGoodsStore = create((set) => ({
  goods: [],

  addGoods: (good) =>
    set((state) => ({
      goods: [...state.goods, good],
    })),

  setGoods: (goods) =>
    set({
      goods,
    }),
}));