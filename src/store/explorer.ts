import { create } from "zustand";
import { WritableDraft } from 'immer';

import { Indicator,IndicatorListResDto } from "@/service/charts";
interface ExplorerStore {
    // 用户当前选择的左上 token 数据
    tokenInfo: {
      symbol: string;
      chain: string;
      start_time: string;
      end_time: string;
    };
  
    // 用户当前选择的左侧某个 indicator 数据
    indicatorInfo: Indicator;
  
    // chart 设置数据
    extra_params: Record<string, any>;
  
    // 左侧全量 indicator 数据
    indicatorList: IndicatorListResDto;  
    // 数据更新统一方法
    setDraftData: (callback: (draft: WritableDraft<ExplorerStore>) => void) => void;
  }