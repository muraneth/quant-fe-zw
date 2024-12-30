import { request } from "@/utils/request";

export enum IndicatorChartType {
  PRICE_LINE = "price_line",
  INDEPENDENT_LINE = "independent_line",
  X_BAR = "x_bar",
  X_BAR_STACK = "x_bar_stack",
  Y_BAR = "y_bar",
  Y_BAR_STACK = "y_bar_stack",
  AREA_STACK = "area_stack",
}

interface TokenListReqDto {
  key: string;
  chain?:string;
}

export interface TokenBaseInfo {
  symbol: string;
  name: string;
  contract_address: string;
  icon_url: string;
  chain: string;
  total_supply: number;
  create_time: string;
}
export interface TokenDetailInfo {
  base_info: TokenBaseInfo;
  indicator_snaps: Array<IndicatorUnit>;
}
export interface IndicatorUnit {
  name: string;
  handle_name: string;
  type: IndicatorChartType;
  value: number;
  value_chg: number;
}


type TokenListResDto = Array<TokenBaseInfo>;

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
): Promise<TokenDetailInfo | null> {
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
  doc: string;
  is_active: boolean;
  param_schema: string;
  collected: boolean;
}

export interface Group {
  group_name: string;
  indicators: Indicator[];
}

export interface IndicatorCategory {
  category: string;
  order: number;
  groups: Group[];
}

export type IndicatorListResDto = Array<IndicatorCategory>;

/**
 * 获取指标列表
 */
export function getIndicatorList(): Promise<IndicatorListResDto> {
  return request({
    url: "/data/api/base/indicatorList",
    method: "GET",
  });
}

export interface IndicatorDetailReqDto {
  symbol?: string;
  chain?: string;
  start_time?: string;
  end_time?: string;
  handle_name?: string;
  base_params?: Record<string, any>;
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
  start_time: string;
  end_time: string;
}

interface BasePriceItem {
  time: string;
  timestamp: number;
  avg_price: number;
  mcp: number;
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

interface CollectIndicatorReqDto {
  handle_name: string;
  base_params?: string;
  extra_params?: string;
}
export function collectIndicator(
  params: CollectIndicatorReqDto
): Promise<void> {
  return request({
    url: "/data/api/userIndicator/collectInd",
    method: "POST",
    params,
  });
}
export function unCollectIndicator(
  params: CollectIndicatorReqDto
): Promise<void> {
  return request({
    url: "/data/api/userIndicator/uncollectInd",
    method: "POST",
    params,
  });
}
export function saveIndicatorParam(
  params: CollectIndicatorReqDto
): Promise<void> {
  return request({
    url: "/data/api/userIndicator/saveIndParam",
    method: "POST",
    params,
  });
}