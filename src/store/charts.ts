import { create } from "zustand";

interface ChartStore {
  tokenInfo: {
    symbol: string;
    chain: string;
  };
  indicatorInfo: {
    required_level: number;
    handler_name: string;
  };
  extra_params: Record<string, any>;
  setTokenInfo: (tokenInfo: ChartStore["tokenInfo"]) => void;
  setIndicatorInfo: (indicatorInfo: ChartStore["indicatorInfo"]) => void;
  setExtraParams: (extra_params: ChartStore["extra_params"]) => void;
  removeChartStore: () => void;
}

const useChartStore = create<ChartStore>((set) => ({
  tokenInfo: {
    symbol: "",
    chain: "",
  },
  indicatorInfo: {
    required_level: 0,
    handler_name: "",
  },
  extra_params: {},
  setTokenInfo: (tokenInfo) => set(() => ({ tokenInfo })),
  setIndicatorInfo: (indicatorInfo) => set(() => ({ indicatorInfo })),
  setExtraParams: (extra_params) => set(() => ({ extra_params })),
  removeChartStore: () =>
    set({
      tokenInfo: {} as ChartStore["tokenInfo"],
      indicatorInfo: {
        required_level: 0,
        handler_name: "",
      },
      extra_params: {},
    }),
}));

export { useChartStore };
