import { create } from "zustand";
import { WritableDraft } from 'immer';
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
    category?: string;
    required_level: number;
    handle_name: string;
    name: string;
    description?: string;
    doc?: string;
    type?: IndicatorChartType;
    param_schema?: string | null;
    collected?: boolean;
  };
  base_params: Record<string, any>;
  extra_params: Record<string, any>;
  klineType: "kline" | "avgPrice";
  options: Record<string, any> | null;
  priceList: BasePriceResDto | null;
  indicatorDetailList: IndicatorListResDto | null;
  resetChartPanelData: ({ refreshChart }: { refreshChart: boolean }) => void;
  removeChartStore: () => void;
  setDraftData: (callback: (draft: WritableDraft<ChartStore>) => void) => void;
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
      setDraftData: (callback) =>
        set((draft) => {
          callback(draft);
        }),
    }))
  )
);

export { useChartStore };
