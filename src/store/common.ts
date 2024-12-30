import { create } from "zustand";

interface CommonStore {
  userName: string;
  plan: number;
  setUserName: (name: string) => void;
  removeCommonStore: () => void;
}

const useCommonStore = create<CommonStore>((set) => ({
  userName: "",
  plan: 1,
  setUserName: (name: string) => set(() => ({ userName: name })),
  removeCommonStore: () => set({ userName: "" }),
}));

export { useCommonStore };
