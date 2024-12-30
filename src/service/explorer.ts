import { request } from "@/utils/request";
import { TokenDetailInfo, TokenBaseInfo, Indicator, IndicatorDetailReqDto, IndicatorListResDto } from "./charts";


export interface UserConfig {
    tokens: Array<string>;
    indicators: Array<Indicator>;
}
export interface SaveUserConfigReq {
    tokens?: Array<string>;
    indicators: Array<string>;
}
export interface TokenSnapReq {
    symbol: string;
    chain?: string;
    indicators: Array<IndicatorDetailReqDto>;
}
export interface TokenPageResponse {
    tokens: Array<TokenBaseInfo>;
    total: number;
}
export function getIndicatorList(): Promise<IndicatorListResDto> {
    return request({
        url: "/data/api/explorer/getIndicatorList",
        method: "GET",
    });
}

export function getUserConfig(): Promise<UserConfig> {
    return request({
        url: "/data/api/explorer/getUserConfig",
        method: "GET",
    });
}

export function saveUserConfig(params: SaveUserConfigReq): Promise<any> {
    return request({
        url: "/data/api/explorer/saveUserConfig",
        method: "POST",
        params,
    });
}
export function getTokenSnap(params: TokenSnapReq): Promise<TokenDetailInfo> {
    return request({
        url: "/data/api/explorer/getTokenSnaps",
        method: "POST",
        params,
    });
}
export function getTokenByPage(params: { page: number; page_size: number }): Promise<TokenPageResponse> {
    return request({
        url: "/data/api/explorer/getTokenByPage",
        method: "POST",
        params,
    });
}
export function getDefaultIndList(): Promise<Array<Indicator>> {
    return request({
        url: "/data/api/explorer/getDefaultIndList",
        method: "GET",
    });
}