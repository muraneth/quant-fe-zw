import { request } from "@/utils/request";
import { TokenDetailInfo ,Indicator,IndicatorDetailReqDto} from "./charts";


export interface UserConfig {
    tokens : Array<string>;
    indicators : Array<Indicator>;
}
export interface SaveUserConfig {
    tokens : Array<string>;
    indicators : Array<string>;
}
export interface TokenSnapReq{
    symbol: string;
    chain?: string;
    indicators : Array<IndicatorDetailReqDto>;
}
export function getTokenDetailList(): Promise<Array<TokenDetailInfo>> {
    return request({
        url: "/data/api/token/getTokenTable",
        method: "GET",
        // params,
    });
}

export function getUserConfig():Promise<UserConfig> {
    return request({
        url: "/data/api/explorer/getUserConfig",
        method: "GET",
    });
}

export function saveUserConfig(params: SaveUserConfig): Promise<any> {
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