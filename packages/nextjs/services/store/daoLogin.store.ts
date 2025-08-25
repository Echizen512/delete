import { create } from "zustand";

type Store = {
  isLogin: boolean;
  setIsLogin: (log: boolean) => void;
};

export const useLoginStore = create<Store>(set => ({
  isLogin: false,
  setIsLogin: log => set({ isLogin: log }),
}));
