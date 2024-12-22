import { request } from "@/utils/request";
import { TokenBaseInfo } from "./charts";
export interface TokenDetailInfo {
    base_info: TokenBaseInfo;
    mcp: number;
    holders: number;
    hhi: number;
    trade_count: number;
    avg_trade_size: number;
    transaction_count: number;
    votility: number;
    pool_size: number;
    pooled_token_ratio: number;
    volume: number;
    price: number;
    price_chg: number;
    avg_cost: number;
    avg_cost_to_price: number;
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