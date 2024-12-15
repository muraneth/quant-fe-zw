import { create } from "zustand";
import { IndicatorChartType } from "@/service/charts";

interface ChartStore {
  tokenInfo: {
    symbol: string;
    chain: string;
  };
  indicatorInfo: {
    selectedIndicatorsId?: string;
    required_level: number;
    handler_name: string;
    type: IndicatorChartType;
  };
  extra_params: Record<string, any>;
  klineType: "avgPrice" | "kline";
  hasLevelAuth: boolean;
  setTokenInfo: (tokenInfo: ChartStore["tokenInfo"]) => void;
  setIndicatorInfo: (indicatorInfo: ChartStore["indicatorInfo"]) => void;
  setExtraParams: (extra_params: ChartStore["extra_params"]) => void;
  setKlineType: (klineType: "avgPrice" | "kline") => void;
  setHasLevelAuth: (hasLevelAuth: boolean) => void;
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
    type: null as unknown as IndicatorChartType.INDEPENDENT_LINE,
  },
  extra_params: {},
  klineType: "avgPrice",
  hasLevelAuth: true,
  setTokenInfo: (tokenInfo) => set(() => ({ tokenInfo })),
  setIndicatorInfo: (indicatorInfo) => set(() => ({ indicatorInfo })),
  setExtraParams: (extra_params) => set(() => ({ extra_params })),
  setKlineType: (klineType) => set(() => ({ klineType })),
  setHasLevelAuth: (hasLevelAuth) => set(() => ({ hasLevelAuth })),
  removeChartStore: () => set({}),
}));

export { useChartStore };
