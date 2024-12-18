import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
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
    start_time : string;
    end_time : string;
  };
  indicatorInfo: {
    selectedIndicatorsId?: string;
    required_level: number;
    handle_name: string;
    name: string;
    description: string;
    doc: string;
    type: IndicatorChartType;
    param_schema: string | null;
  };
  base_params: Record<string, any>;
  extra_params: Record<string, any>;
  klineType: "kline"|"avgPrice";
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
  create<ChartStore>()(
    immer((set) => ({
      tokenInfo: {
        symbol: "",
        chain: "",
        start_time : "",
        end_time : "",
      },
      indicatorInfo: {
        required_level: 0,
        handle_name: "",
        name: "",
        description: "",
        doc: "",
        type: null as unknown as IndicatorChartType.INDEPENDENT_LINE,
        param_schema: null,
      },
      base_params: {},
      extra_params: {},
      klineType: "kline",
      hasLevelAuth: true,
      options: null,
      chartData: null,

      setTokenInfo: (tokenInfo) =>
        set((state) => {
          state.tokenInfo = tokenInfo;
        }),
      setIndicatorInfo: (indicatorInfo) =>
        set((state) => {
          state.indicatorInfo = indicatorInfo;
        }),
      setBaseParams: (base_params) =>
        set((state) => {
          state.base_params = base_params;
        }),
      setExtraParams: (extra_params) =>
        set((state) => {
          state.extra_params = extra_params;
        }),
      setKlineType: (klineType) =>
        set((state) => {
          state.klineType = klineType;
        }),
      setHasLevelAuth: (hasLevelAuth) =>
        set((state) => {
          state.hasLevelAuth = hasLevelAuth;
        }),
      setOptions: (options) =>
        set((state) => {
          state.options = options;
        }),
      setChartData: (chartData) =>
        set((state) => {
          state.chartData = chartData;
        }),

      removeChartStore: () => set({}),
    }))
  )
);

export { useChartStore };
