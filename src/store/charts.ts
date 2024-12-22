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
    start_time: string;
    end_time: string;
  };
  indicatorInfo: {
    id?: string;
    category?: string;
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
  klineType: "kline" | "avgPrice";
  options: Record<string, any> | null;
  priceList: BasePriceResDto | null;
  indicatorDetailList: IndicatorListResDto | null;

  setTokenInfo: (tokenInfo: ChartStore["tokenInfo"]) => void;
  setIndicatorInfo: (indicatorInfo: ChartStore["indicatorInfo"]) => void;
  setBaseParams: (base_params: ChartStore["base_params"]) => void;
  setExtraParams: (extra_params: ChartStore["extra_params"]) => void;
  setKlineType: (klineType: ChartStore["klineType"]) => void;
  setOptions: (options: ChartStore["options"]) => void;
  setPriceList: (priceList: ChartStore["priceList"]) => void;
  setIndicatorDetailList: (
    indicatorDetailList: ChartStore["indicatorDetailList"]
  ) => void;

  resetChartPanelData: ({ refreshChart }: { refreshChart: boolean }) => void;
  removeChartStore: () => void;
}

const initialState = {
  tokenInfo: {
    symbol: "",
    chain: "",
    start_time: "",
    end_time: "",
  },
  indicatorInfo: {
    required_level: 1,
    handle_name: "",
    name: "",
    description: "",
    doc: "",
    type: null as unknown as IndicatorChartType.INDEPENDENT_LINE,
    param_schema: null,
  },
  base_params: {},
  extra_params: {},
  klineType: "kline" as any,
  hasLevelAuth: true,
  options: null,
  priceList: [],
  indicatorDetailList: [],
}

const useChartStore = createSelectors(
  create<ChartStore>()(
    immer((set) => ({
      ...initialState,

      setTokenInfo: (tokenInfo) =>
        set((draft) => {
          draft.tokenInfo = tokenInfo;
        }),
      setIndicatorInfo: (indicatorInfo) =>
        set((draft) => {
          draft.indicatorInfo = indicatorInfo;
        }),
      setBaseParams: (base_params) =>
        set((draft) => {
          draft.base_params = base_params;
        }),
      setExtraParams: (extra_params) =>
        set((draft) => {
          draft.extra_params = extra_params;
        }),
      setKlineType: (klineType) =>
        set((draft) => {
          draft.klineType = klineType;
        }),

      setOptions: (options) =>
        set((draft) => {
          draft.options = options;
        }),
      setPriceList: (priceList) =>
        set((draft) => {
          draft.priceList = priceList;
        }),
      setIndicatorDetailList: (indicatorDetailList) =>
        set((draft) => {
          draft.indicatorDetailList = indicatorDetailList;
        }),

      resetChartPanelData: ({ refreshChart }) =>
        set((draft) => {
          draft.base_params = {};
          draft.extra_params = {};
          draft.klineType = "kline";
          draft.indicatorDetailList = null;
          if (refreshChart) {
            // options 置空 -> 触发 echarts.clear()
            draft.options = null;
          }
        }),
      removeChartStore: () => set(initialState),
    }))
  )
);

export { useChartStore };
