import { create } from "zustand";
import displayMockData from "../data/displayMockData";

export const useGoodsStore = create((set) => ({
  goods: displayMockData,

  addGoods: (good) =>
    set((state) => ({
      goods: [...state.goods, good],
    })),

  setGoods: (goods) =>
    set({
      goods,
    }),
}));