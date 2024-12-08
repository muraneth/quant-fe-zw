import { request } from "@/utils/request";

export enum IndicatorChartType {
  INDEPENDENT_LINE = "independent_line",
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
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  category: string;
  handler_name: string;
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
  handler_name: string;
  extra_params: Record<string, any>;
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
    params: {
      symbol: "MSTR",
      chain: "eth",
      handle_name: "avgcost.all",

      extra_params: {},
    },
  });
}
