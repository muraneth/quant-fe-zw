import { request } from "@/utils/request";



export interface WalletListReqDto {
    symbol: string;
    chain: string;
    order_by: string;
    start_time: string;
}
export interface WalletBaseInfo {
    wallet_address: string;
    balance: number;
    percentage: number;
    balance_usd: number;
    total_token_day: number;
    avg_token_day: number;
    avg_cost: number;
    total_cost: number;
    total_pnl: number;
    unrealized_pnl: number;
    total_txs: number;

}

export const getTopWalletList = (params: WalletListReqDto): Promise<Array<WalletBaseInfo>> => {
    return request({
        url: "/data/api/wallet/topWallet",
        method: "POST",
        params,
    });
}