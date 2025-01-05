import { request } from "@/utils/request";
import { TokenDetailInfo, Indicator, IndicatorDetailReqDto, IndicatorListResDto } from "./charts";
import { TokenBaseInfo, BaseToken } from "./base";


export interface UserConfig {
    tokens: Array<BaseToken>;
    indicators: Array<Indicator>;
}
export interface SaveUserConfigReq {
    tokens?: Array<string>;
    indicators: Array<string>;
}

export interface SaveUserTokenReq {
    tokens: Array<BaseToken>;
}
export interface TokenSnapReq extends BaseToken {

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

export function saveUserIndicator(params: SaveUserConfigReq): Promise<any> {
    return request({
        url: "/data/api/explorer/saveUserIndicator",
        method: "POST",
        params,
    });
}
export function saveUserTokens(params: SaveUserTokenReq): Promise<any> {
    return request({
        url: "/data/api/explorer/saveUserTokens",
        method: "POST",
        params,
    });
}
export function deleteUserToken(params: BaseToken): Promise<any> {
    return request({
        url: "/data/api/explorer/deleteUserToken",
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
export function getTokenByPage(params: { key: string; page: number; page_size: number }): Promise<TokenPageResponse> {
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