
export interface BaseToken {
    symbol: string;
    chain: string;
}


export interface TokenBaseInfo {
    symbol: string;
    name: string;
    contract_address: string;
    icon_url: string;
    chain: string;
    total_supply: number;
    create_time: string;
    collected: boolean;
}
