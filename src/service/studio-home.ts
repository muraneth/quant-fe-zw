import { request } from "@/utils/request";
import { TokenBaseInfo } from "./charts";
export interface IndicatorUnit {
    name: string;
    value: number;
    value_chg: number;
}
export interface TokenDetailInfo {
    base_info: TokenBaseInfo;
    indicator_snaps: Array<IndicatorUnit>;
}
type TokenInfoListResDto = Array<TokenDetailInfo>;

export function getTokenDetailList(
    params?: TokenInfoListResDto
): Promise<TokenInfoListResDto> {
    return request({
        url: "/data/api/token/getTokenTable",
        method: "GET",
        params,
    });
}