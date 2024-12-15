import { request } from "@/utils/request";

export enum IndicatorChartType {
  PRICE_LINE = "price_line",
  INDEPENDENT_LINE = "independent_line",
  X_BAR = "x_bar",
  X_BAR_STACK = "x_bar_stack",
  Y_BAR = "y_bar",
  Y_BAR_STACK = "y_bar_stack",
}

interface TokenListReqDto {
  key: string;
}

export interface TokenListItem {
  symbol: string;
  name: string;
  contract_address: string;
  icon_url: string;
  chain: string;
  total_supply: number;
  create_time: string;
}

type TokenListResDto = Array<TokenListItem>;

/**
 * 搜索 token
 */
export function getTokenList(
  params?: TokenListReqDto
): Promise<TokenListResDto> {
  return request({
    url: "/data/api/token/searchToken",
    method: "GET",
    params,
  });
}

interface TokenMarketInfoReqDto {
  symbol: string;
  chain: string;
}

/**
 * 获取市场信息
 */
export function getTokenMarketInfo(
  params: TokenMarketInfoReqDto
): Promise<Record<string, any>> {
  return request({
    url: "/data/api/token/getTokenMarketInfo",
    method: "GET",
    params,
  });
}

export interface Indicator {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  category: string;
  handle_name: string;
  group_name: string;
  type: IndicatorChartType;
  required_level: number;
  description: string;
  is_active: boolean;
  param_schema: string;
}

export interface Group {
  group_name: string;
  indicators: Indicator[];
}

interface IndicatorListItem {
  category: string;
  order: number;
  groups: Group[];
}

export type IndicatorListResDto = Array<IndicatorListItem>;

/**
 * 获取指标列表
 */
export function getIndicatorList(): Promise<IndicatorListResDto> {
  return request({
    url: "/data/api/base/indicatorList",
    method: "GET",
  });
}

interface IndicatorDetailReqDto {
  symbol: string;
  chain: string;
  handle_name: string;
  base_params: Record<string, any>;
  extra_params?: Record<string, any>;
}

/**
 * 获取指标详情
 */
export function getIndicatorDetail(
  params: IndicatorDetailReqDto
): Promise<Array<Record<string, any>>> {
  return request({
    url: "/data/api/indicator",
    method: "POST",
    params,
  });
}

interface BasePriceReqDto {
  symbol: string;
  chain: string;
}

interface BasePriceItem {
  time: string;
  timestamp: number;
  avg_price: number;
  high: number;
  low: number;
  open: number;
  close: number;
}

export type BasePriceResDto = BasePriceItem[];

/**
 * 获取k线价格
 */
export function getBasePrice(
  params: BasePriceReqDto
): Promise<BasePriceResDto> {
  return request({
    url: "/data/api/base/price",
    method: "POST",
    params,
  });
}
