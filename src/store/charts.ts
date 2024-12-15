import { create } from "zustand";
import { createSelectors } from "@/utils/store";
import {
  IndicatorChartType,
  IndicatorListResDto,
  BasePriceResDto,
} from "@/service/charts";

interface ChartStore {
  tokenInfo: {
    symbol: string;
    chain: string;
  };
  indicatorInfo: {
    selectedIndicatorsId?: string;
    required_level: number;
    handle_name: string;
    type: IndicatorChartType;
    param_schema: string | null;
  };
  base_params: Record<string, any>;
  extra_params: Record<string, any>;
  klineType: "avgPrice" | "kline";
  hasLevelAuth: boolean;
  options: Record<string, any> | null;
  chartData: {
    indicatorData: IndicatorListResDto | null;
    klineList: BasePriceResDto | null;
  } | null;

  setTokenInfo: (tokenInfo: ChartStore["tokenInfo"]) => void;
  setIndicatorInfo: (indicatorInfo: ChartStore["indicatorInfo"]) => void;
  setBaseParams: (base_params: ChartStore["base_params"]) => void;
  setExtraParams: (extra_params: ChartStore["extra_params"]) => void;
  setKlineType: (klineType: ChartStore["klineType"]) => void;
  setHasLevelAuth: (hasLevelAuth: ChartStore["hasLevelAuth"]) => void;
  setOptions: (options: ChartStore["options"]) => void;
  setChartData: (chartData: ChartStore["chartData"]) => void;

  removeChartStore: () => void;
}

const useChartStore = createSelectors(
  create<ChartStore>((set) => ({
    tokenInfo: {
      symbol: "",
      chain: "",
    },
    indicatorInfo: {
      required_level: 0,
      handle_name: "",
      type: null as unknown as IndicatorChartType.INDEPENDENT_LINE,
      param_schema: null,
    },
    base_params: {},
    extra_params: {},
    klineType: "avgPrice",
    hasLevelAuth: true,
    options: null,
    chartData: null,

    setTokenInfo: (tokenInfo) => set(() => ({ tokenInfo })),
    setIndicatorInfo: (indicatorInfo) => set(() => ({ indicatorInfo })),
    setBaseParams: (base_params) => set(() => ({ base_params })),
    setExtraParams: (extra_params) => set(() => ({ extra_params })),
    setKlineType: (klineType) => set(() => ({ klineType })),
    setHasLevelAuth: (hasLevelAuth) => set(() => ({ hasLevelAuth })),
    setOptions: (options) => set(() => ({ options })),
    setChartData: (chartData) => set(() => ({ chartData })),

    removeChartStore: () => set({}),
  }))
);

export { useChartStore };
