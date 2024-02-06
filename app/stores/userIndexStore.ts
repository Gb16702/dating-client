import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserIndexState {
  currentIndex: number;
  currentPage: number;
  totalPage: number;
  setIndex: (index: number) => void;
  setPage: (page: number) => void;
  setTotalPage: (totalPage: number) => void;
}

export const useUserIndexStore = create(
  persist(
    set => ({
      currentIndex: 0,
      currentPage: 1,
      totalPage: 0,
      setIndex: (index: number) => set({ currentIndex: index }),
      setPage: (page: number) => set({ currentPage: page }),
      setTotalPage: (totalPage: number) => set({ totalPage: totalPage }),
    }),
    {
      name: "user-index-store",
      getStorage: () => localStorage,
    }
  )
);
