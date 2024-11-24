import { create } from "zustand";

interface CommonStore {
  userName: string;
  setUserName: (name: string) => void;
  removeCommonStore: () => void;
}

const useCommonStore = create<CommonStore>((set) => ({
  userName: "",
  setUserName: (name: string) => set(() => ({ userName: name })),
  removeCommonStore: () => set({ userName: "" }),
}));

export { useCommonStore };
