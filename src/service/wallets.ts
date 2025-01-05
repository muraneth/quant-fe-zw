import { request } from "@/utils/request";



export interface WalletListReqDto {
    symbol: string;
    chain: string;
    order_by: string;
    start_time: string;
}
export interface WalletInfoReq {
    symbol: string;
    chain: string;
    start_time?: string;
    wallet_address: string;
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
    tx_in_count: number;
    tx_out_count: number;
    win_rate: number;

}
export interface WalletDailyInfo {
    day: string;
    wallet_address: string;
    balance: number;
    balance_chg: number;
    balance_usd: number;
    total_token_day: number;
    avg_token_day: number;
    token_day_destory: number;
    avg_cost: number;
    total_cost: number;
    realized_pnl: number;
    total_pnl: number;
    unrealized_pnl: number;
    idx_price: number;

}

export const getTopWalletList = (params: WalletListReqDto): Promise<Array<WalletBaseInfo>> => {
    return request({
        url: "/data/api/wallet/topWallet",
        method: "POST",
        params,
    });
}
export const getWalletInfo = (params: WalletInfoReq): Promise<Array<WalletDailyInfo>> => {
    return request({
        url: "/data/api/wallet/walletInfo",
        method: "POST",
        params,
    });
}