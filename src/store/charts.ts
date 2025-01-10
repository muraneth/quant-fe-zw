import { create } from "zustand";
import { WritableDraft } from 'immer';
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/utils/store";
import {
  Indicator,
  IndicatorChartType,
  IndicatorListResDto,
  BasePriceResDto,
} from "@/service/charts";

interface ChartStore {
  // 用户当前选择的左上 token 数据
  tokenInfo: {
    symbol: string;
    chain: string;
    create_time: string;
    collected: boolean;
    // start_time: string;
    // end_time: string;
  };
  selectedTimeRange: {
    start_time: string;
    end_time: string;
  };

  // 用户当前选择的左侧某个 indicator 数据
  indicatorInfo: Indicator;

  // 用户当前选择的左侧某个 indicator 的详情数据
  indicatorDetailList: Array<Record<string, any>> | null;

  // chart 设置数据
  base_params: Record<string, any>;
  extra_params: Record<string, any>;
  klineType: "kline" | "avgPrice";

  // 价格列表
  priceList: BasePriceResDto | null;

  // 根据当前选择的 indicator 数据以及 chart 设置的数据，构造出的 echarts options
  options: Record<string, any> | null;

  // 左侧全量 indicator 数据
  indicatorList: IndicatorListResDto;

  // 重置 chart 部分数据 
  resetChartPanelData: ({ refreshChart }: { refreshChart: boolean }) => void;

  // 重置当前 store 所有数据
  removeChartStore: () => void;

  // 数据更新统一方法
  setDraftData: (callback: (draft: WritableDraft<ChartStore>) => void) => void;
}

const initialState = {
  tokenInfo: {
    symbol: "",
    chain: "",
    create_time: "",
    collected:false
  },
  selectedTimeRange: {
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
  } as unknown as Indicator,
  base_params: {},
  extra_params: {},
  klineType: "kline" as any,
  hasLevelAuth: true,
  options: null,
  priceList: [],
  indicatorDetailList: [],
  indicatorList: []
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
