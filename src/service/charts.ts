// import { request } from "@/utils/request";

interface TokenListReqDto {
  key: string;
}

interface TokenListItem {
  symbol: string;
  name: string;
  contract_address: string;
  icon_url: string;
  chain: string;
  total_supply: number;
  create_time: string;
}

type TokenListResDto = Array<TokenListItem>;

export function getTokenList(
  params: TokenListReqDto
): Promise<TokenListResDto> {
  return Promise.resolve([
    {
      symbol: "DOG1",
      name: "The Doge NFT1",
      contract_address: "0xbaac2b4491727d78d2b78815144570b9f2fe8899",
      icon_url:
        "https://assets.coingecko.com/coins/images/18111/large/Doge.png?1696517615",
      chain: "ethereum",
      total_supply: 16969696969,
      create_time: "2021-08-31T17:11:17+08:00",
    },
    {
      symbol: "DOG2",
      name: "The Doge NFT2",
      contract_address: "0xbaac2b4491727d78d2b78815144570b9f2fe8899",
      icon_url:
        "https://assets.coingecko.com/coins/images/18111/large/Doge.png?1696517615",
      chain: "ethereum",
      total_supply: 16969696969,
      create_time: "2021-08-31T17:11:17+08:00",
    },
    {
      symbol: "DOG3",
      name: "The Doge NFT3",
      contract_address: "0xbaac2b4491727d78d2b78815144570b9f2fe8899",
      icon_url:
        "https://assets.coingecko.com/coins/images/18111/large/Doge.png?1696517615",
      chain: "ethereum",
      total_supply: 16969696969,
      create_time: "2021-08-31T17:11:17+08:00",
    },
    {
      symbol: "DOG4",
      name: "The Doge NFT4",
      contract_address: "0xbaac2b4491727d78d2b78815144570b9f2fe8899",
      icon_url:
        "https://assets.coingecko.com/coins/images/18111/large/Doge.png?1696517615",
      chain: "ethereum",
      total_supply: 16969696969,
      create_time: "2021-08-31T17:11:17+08:00",
    },
    {
      symbol: "DOG5",
      name: "The Doge NFT5",
      contract_address: "0xbaac2b4491727d78d2b78815144570b9f2fe8899",
      icon_url:
        "https://assets.coingecko.com/coins/images/18111/large/Doge.png?1696517615",
      chain: "ethereum",
      total_supply: 16969696969,
      create_time: "2021-08-31T17:11:17+08:00",
    },
    {
      symbol: "DOG6",
      name: "The Doge NFT6",
      contract_address: "0xbaac2b4491727d78d2b78815144570b9f2fe8899",
      icon_url:
        "https://assets.coingecko.com/coins/images/18111/large/Doge.png?1696517615",
      chain: "ethereum",
      total_supply: 16969696969,
      create_time: "2021-08-31T17:11:17+08:00",
    },
    {
      symbol: "DOG7",
      name: "The Doge NFT7",
      contract_address: "0xbaac2b4491727d78d2b78815144570b9f2fe8899",
      icon_url:
        "https://assets.coingecko.com/coins/images/18111/large/Doge.png?1696517615",
      chain: "ethereum",
      total_supply: 16969696969,
      create_time: "2021-08-31T17:11:17+08:00",
    },
    {
      symbol: "DOG8",
      name: "The Doge NFT8",
      contract_address: "0xbaac2b4491727d78d2b78815144570b9f2fe8899",
      icon_url:
        "https://assets.coingecko.com/coins/images/18111/large/Doge.png?1696517615",
      chain: "ethereum",
      total_supply: 16969696969,
      create_time: "2021-08-31T17:11:17+08:00",
    },
  ]);
}

export interface Indicator {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  category: string;
  handler_name: string;
  group_name: string;
  type: string;
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

export function getIndicatorList(): Promise<IndicatorListResDto> {
  // return request({
  //   url: '/data/api/user/login',
  //   method: 'POST',
  // })
  return Promise.resolve([
    {
      category: "Default",
      order: 100,
      groups: [
        {
          group_name: "PNL",
          indicators: [
            {
              id: "18",
              created_at: "2024-11-24T21:04:29+08:00",
              updated_at: "2024-11-24T21:04:29+08:00",
              name: "Realized PNL",
              category: "Default",
              handler_name: "pnl.realized_pnl",
              group_name: "PNL",
              type: "independent_line",
              required_level: 2,
              description: "Returns the realized PNL",
              is_active: true,
              param_schema: "",
            },
          ],
        },
        {
          group_name: "Price By Volume",
          indicators: [
            {
              id: "6",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
          ],
        },
        {
          group_name: "balance",
          indicators: [
            {
              id: "32",
              created_at: "2024-11-27T21:47:50+08:00",
              updated_at: "2024-11-27T21:47:50+08:00",
              name: "First Day Wallets Balance",
              category: "Default",
              handler_name: "balance.first_day_wallets_balance",
              group_name: "balance",
              type: "independent_line",
              required_level: 2,
              description:
                "Returns the balance of wallets created on the first day",
              is_active: true,
              param_schema: "",
            },
            {
              id: "33",
              created_at: "2024-11-27T21:54:47+08:00",
              updated_at: "2024-11-27T21:54:47+08:00",
              name: "First Day Wallets Balance Ratio",
              category: "Default",
              handler_name: "balance.first_day_wallets_balance_ratio",
              group_name: "balance",
              type: "independent_line",
              required_level: 2,
              description:
                "Returns the balance of wallets created on the first day as a ratio",
              is_active: true,
              param_schema: "",
            },
          ],
        },
        {
          group_name: "general",
          indicators: [
            {
              id: "1",
              created_at: "2024-11-24T10:48:53+08:00",
              updated_at: "2024-11-24T10:48:53+08:00",
              name: "Token Destroy",
              category: "Default",
              handler_name: "token_destory",
              group_name: "general",
              type: "independent_line",
              required_level: 2,
              description: "Tracks token destruction over time",
              is_active: true,
              param_schema: "",
            },
            {
              id: "2",
              created_at: "2024-11-24T10:48:53+08:00",
              updated_at: "2024-11-24T10:48:53+08:00",
              name: "Token Liveliness",
              category: "Default",
              handler_name: "liveliness",
              group_name: "general",
              type: "independent_line",
              required_level: 2,
              description: "Measures token activity",
              is_active: true,
              param_schema: "",
            },
            {
              id: "21",
              created_at: "2024-11-24T22:44:24+08:00",
              updated_at: "2024-11-24T22:44:24+08:00",
              name: "Diamond Hand Index",
              category: "Default",
              handler_name: "general.diamond_hand_index",
              group_name: "general",
              type: "independent_line",
              required_level: 3,
              description: "Returns the diamond hand index",
              is_active: true,
              param_schema: "",
            },
            {
              id: "22",
              created_at: "2024-11-24T22:44:24+08:00",
              updated_at: "2024-11-24T22:44:24+08:00",
              name: "HHI",
              category: "Default",
              handler_name: "general.hhi",
              group_name: "general",
              type: "independent_line",
              required_level: 3,
              description: "Returns the HHI",
              is_active: true,
              param_schema: "",
            },
            {
              id: "23",
              created_at: "2024-11-24T22:48:16+08:00",
              updated_at: "2024-11-24T22:48:16+08:00",
              name: "Diamond Hand Index With Cex",
              category: "Default",
              handler_name: "general.diamond_hand_index_with_cex",
              group_name: "general",
              type: "independent_line",
              required_level: 3,
              description: "Returns the diamond hand index with cex address",
              is_active: true,
              param_schema: "",
            },
            {
              id: "24",
              created_at: "2024-11-24T22:48:16+08:00",
              updated_at: "2024-11-24T22:48:16+08:00",
              name: "HHI With Cex",
              category: "Default",
              handler_name: "general.hhi_with_cex",
              group_name: "general",
              type: "independent_line",
              required_level: 3,
              description: "Returns the HHI with cex address",
              is_active: true,
              param_schema: "",
            },
          ],
        },
        {
          group_name: "holder",
          indicators: [
            {
              id: "3",
              created_at: "2024-11-24T18:35:40+08:00",
              updated_at: "2024-11-24T18:35:40+08:00",
              name: "Holder All",
              category: "Default",
              handler_name: "holder_all",
              group_name: "holder",
              type: "independent_line",
              required_level: 1,
              description: "All holder count including zero balance address",
              is_active: true,
              param_schema: "",
            },
            {
              id: "11",
              created_at: "2024-11-24T20:55:33+08:00",
              updated_at: "2024-11-24T22:38:59+08:00",
              name: "Holder Balance >= 1 USD",
              category: "Default",
              handler_name: "holder.balance_over_1_usd",
              group_name: "holder",
              type: "independent_line",
              required_level: 2,
              description:
                "Returns the number of holders with a balance over 1 USD",
              is_active: true,
              param_schema: "",
            },
            {
              id: "12",
              created_at: "2024-11-24T20:55:33+08:00",
              updated_at: "2024-11-24T22:38:59+08:00",
              name: "Holder Balance >= 10 USD",
              category: "Default",
              handler_name: "holder.balance_over_10_usd",
              group_name: "holder",
              type: "independent_line",
              required_level: 2,
              description:
                "Returns the number of holders with a balance over 10 USD",
              is_active: true,
              param_schema: "",
            },
            {
              id: "13",
              created_at: "2024-11-24T20:55:33+08:00",
              updated_at: "2024-11-24T22:38:59+08:00",
              name: "Holder Balance >= 100 USD",
              category: "Default",
              handler_name: "holder.balance_over_100_usd",
              group_name: "holder",
              type: "independent_line",
              required_level: 2,
              description:
                "Returns the number of holders with a balance over 100 USD",
              is_active: true,
              param_schema: "",
            },
            {
              id: "14",
              created_at: "2024-11-24T20:55:33+08:00",
              updated_at: "2024-11-24T22:38:59+08:00",
              name: "Holder Balance >= 1000 USD",
              category: "Default",
              handler_name: "holder.balance_over_1000_usd",
              group_name: "holder",
              type: "independent_line",
              required_level: 2,
              description:
                "Returns the number of holders with a balance over 1000 USD",
              is_active: true,
              param_schema: "",
            },
            {
              id: "15",
              created_at: "2024-11-24T20:55:33+08:00",
              updated_at: "2024-11-24T22:38:59+08:00",
              name: "Holder Balance >= 10000 USD",
              category: "Default",
              handler_name: "holder.balance_over_10000_usd",
              group_name: "holder",
              type: "independent_line",
              required_level: 2,
              description:
                "Returns the number of holders with a balance over 10000 USD",
              is_active: true,
              param_schema: "",
            },
            {
              id: "16",
              created_at: "2024-11-24T21:04:29+08:00",
              updated_at: "2024-11-24T21:04:29+08:00",
              name: "Holder Balance USD In Range",
              category: "Default",
              handler_name: "holder.count_by_usd_balanace_range",
              group_name: "holder",
              type: "independent_line",
              required_level: 3,
              description: "Balance USD in range ",
              is_active: true,
              param_schema: "",
            },
            {
              id: "17",
              created_at: "2024-11-24T21:04:29+08:00",
              updated_at: "2024-11-24T21:04:29+08:00",
              name: "Holder Balance Token In Range",
              category: "Default",
              handler_name: "holder.count_by_token_balanace_range",
              group_name: "holder",
              type: "independent_line",
              required_level: 3,
              description: "Balance token in range ",
              is_active: true,
              param_schema: "",
            },
            {
              id: "19",
              created_at: "2024-11-24T22:38:59+08:00",
              updated_at: "2024-11-24T22:38:59+08:00",
              name: "Holder Balance Token >= 0.0001",
              category: "Default",
              handler_name: "holder.balance_over_top_0_0001_token",
              group_name: "holder",
              type: "independent_line",
              required_level: 2,
              description:
                "Returns the number of holders with a balance over 0.0001",
              is_active: true,
              param_schema: "",
            },
            {
              id: "20",
              created_at: "2024-11-24T22:38:59+08:00",
              updated_at: "2024-11-24T22:38:59+08:00",
              name: "Holder Balance Token >= 0.00001",
              category: "Default",
              handler_name: "holder.balance_over_top_0_00001_token",
              group_name: "holder",
              type: "independent_line",
              required_level: 2,
              description:
                "Returns the number of holders with a balance over 0.00001",
              is_active: true,
              param_schema: "",
            },
          ],
        },
        {
          group_name: "price",
          indicators: [
            {
              id: "4",
              created_at: "2024-11-24T18:50:30+08:00",
              updated_at: "2024-11-24T18:50:30+08:00",
              name: "Avg Cost",
              category: "Default",
              handler_name: "avg_cost",
              group_name: "price",
              type: "price_line",
              required_level: 3,
              description: "Global wallets average cost",
              is_active: true,
              param_schema: "",
            },
            {
              id: "7",
              created_at: "2024-11-24T20:12:40+08:00",
              updated_at: "2024-11-24T20:12:40+08:00",
              name: "Avg Cost Before Day",
              category: "Default",
              handler_name: "avg_cost_before_day",
              group_name: "price",
              type: "price_line",
              required_level: 3,
              description: "Avg Cost of wallets Before Day",
              is_active: true,
              param_schema: "",
            },
            {
              id: "8",
              created_at: "2024-11-24T20:13:02+08:00",
              updated_at: "2024-11-24T20:13:02+08:00",
              name: "Avg Cost After Day",
              category: "Default",
              handler_name: "avg_cost_after_day",
              group_name: "price",
              type: "price_line",
              required_level: 3,
              description: "Avg Cost of wallets after Day",
              is_active: true,
              param_schema: "",
            },
            {
              id: "25",
              created_at: "2024-11-26T23:12:01+08:00",
              updated_at: "2024-11-26T23:12:01+08:00",
              name: "Average Cost",
              category: "Default",
              handler_name: "price.avg_cost",
              group_name: "price",
              type: "price_line",
              required_level: 3,
              description: "Returns the average cost",
              is_active: true,
              param_schema: "",
            },
            {
              id: "26",
              created_at: "2024-11-26T23:12:01+08:00",
              updated_at: "2024-11-26T23:12:01+08:00",
              name: "Top Holdlers Average Cost",
              category: "Default",
              handler_name: "price.top_holders_avg_cost",
              group_name: "price",
              type: "price_line",
              required_level: 3,
              description: " Returns the average cost of the top holders",
              is_active: true,
              param_schema:
                '{"type": "object", "required": ["top"], "properties": {"top": {"type": "integer", "title": "Number of top holders", "default": 10, "maximum": 1000, "minimum": 1, "description": "Number of top holders"}}, "additionalProperties": false}',
            },
            {
              id: "27",
              created_at: "2024-11-26T23:12:01+08:00",
              updated_at: "2024-11-26T23:12:01+08:00",
              name: "Except Top Holdlers Average Cost",
              category: "Default",
              handler_name: "price.except_top_holders_avg_cost",
              group_name: "price",
              type: "price_line",
              required_level: 3,
              description:
                " Returns the average cost of the except top holders",
              is_active: true,
              param_schema:
                '{"type": "object", "required": ["top"], "properties": {"top": {"type": "integer", "title": "Number of top holders", "default": 10, "maximum": 1000, "minimum": 1, "description": "Number of top holders"}}, "additionalProperties": false}',
            },
            {
              id: "28",
              created_at: "2024-11-26T23:12:01+08:00",
              updated_at: "2024-11-26T23:12:01+08:00",
              name: "Average Cost By Day Before",
              category: "Default",
              handler_name: "price.avg_cost_by_day_before",
              group_name: "price",
              type: "price_line",
              required_level: 3,
              description:
                "Returns the average cost of wallets created before the specified day",
              is_active: true,
              param_schema:
                '{"type": "object", "required": ["start_time"], "properties": {"start_time": {"type": "string", "title": "Day before", "default": 1, "minimum": 1, "input_type": "calendar", "description": "Day before"}}, "additionalProperties": false}',
            },
            {
              id: "29",
              created_at: "2024-11-26T23:12:01+08:00",
              updated_at: "2024-11-26T23:12:01+08:00",
              name: "Average Cost By Day After",
              category: "Default",
              handler_name: "price.avg_cost_by_day_after",
              group_name: "price",
              type: "price_line",
              required_level: 3,
              description:
                "Returns the average cost of wallets created after the specified day",
              is_active: true,
              param_schema:
                '{"type": "object", "required": ["start_time"], "properties": {"start_time": {"type": "string", "title": "Day after", "default": 1, "minimum": 1, "input_type": "calendar", "description": "Day after"}}, "additionalProperties": false}',
            },
            {
              id: "30",
              created_at: "2024-11-26T23:12:01+08:00",
              updated_at: "2024-11-26T23:12:01+08:00",
              name: "Average Cost of First Day Wallets",
              category: "Default",
              handler_name: "price.avg_cost_of_first_day_trade",
              group_name: "price",
              type: "price_line",
              required_level: 3,
              description:
                "Returns the average cost of wallets that traded on the first day",
              is_active: true,
              param_schema: "",
            },
            {
              id: "31",
              created_at: "2024-11-27T09:33:46+08:00",
              updated_at: "2024-11-27T09:33:46+08:00",
              name: "Average Cost of Fix Investment",
              category: "Default",
              handler_name: "price.avg_cost_of_fix_investment",
              group_name: "price",
              type: "price_line",
              required_level: 3,
              description: "Returns the average cost of fixed investment",
              is_active: true,
              param_schema: "",
            },
          ],
        },
        {
          group_name: "volume",
          indicators: [
            {
              id: "5",
              created_at: "2024-11-24T19:17:19+08:00",
              updated_at: "2024-11-24T19:39:44+08:00",
              name: "Trade USD Volume",
              category: "Default",
              handler_name: "trade_usd_volume",
              group_name: "volume",
              type: "x_bar_stack",
              required_level: 2,
              description: "USD volume on Uniswap, including v2 and v3",
              is_active: true,
              param_schema: "",
            },
          ],
        },
      ],
    },
    {
      category: "Testxxx",
      order: 50,
      groups: [
        {
          group_name: "Test By Volume",
          indicators: [
            {
              id: "1000",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
            {
              id: "1001",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
          ],
        },
      ],
    },
    {
      category: "Testxxx1111",
      order: 50,
      groups: [
        {
          group_name: "Test By Volume",
          indicators: [
            {
              id: "10002",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
            {
              id: "1003",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
          ],
        },
      ],
    },
    {
      category: "Testxxx22222",
      order: 50,
      groups: [
        {
          group_name: "Test By Volume",
          indicators: [
            {
              id: "10004",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
            {
              id: "1005",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
          ],
        },
      ],
    },
    {
      category: "Testxxx23333",
      order: 50,
      groups: [
        {
          group_name: "Test By Volume",
          indicators: [],
        },
      ],
    },
    {
      category: "Testxxx5555",
      order: 50,
      groups: [
        {
          group_name: "Test By Volume",
          indicators: [
            {
              id: "10005",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
          ],
        },
      ],
    },
    {
      category: "Testxxx666666666",
      order: 50,
      groups: [
        {
          group_name: "Test By Volume",
          indicators: [
            {
              id: "10006",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
          ],
        },
      ],
    },
    {
      category: "Testxxx66666777",
      order: 50,
      groups: [
        {
          group_name: "Test By Volume",
          indicators: [
            {
              id: "10007",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
          ],
        },
      ],
    },
    {
      category: "Testxxx666688888mmmmmmmmmmmmmmmmmm",
      order: 50,
      groups: [
        {
          group_name: "Test By Volume",
          indicators: [
            {
              id: "10008",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
          ],
        },
      ],
    },
    {
      category: "Testxxx669999",
      order: 50,
      groups: [
        {
          group_name: "Test By Volume",
          indicators: [
            {
              id: "10009",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
          ],
        },
      ],
    },
    {
      category: "Testxxx10",
      order: 50,
      groups: [
        {
          group_name: "Test By Volume",
          indicators: [
            {
              id: "100010",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
          ],
        },
      ],
    },
    {
      category: "Testxxx11",
      order: 50,
      groups: [
        {
          group_name: "Test By Volume",
          indicators: [
            {
              id: "100011",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
          ],
        },
      ],
    },
    {
      category: "Testxxx12",
      order: 50,
      groups: [
        {
          group_name: "Test By Volume",
          indicators: [
            {
              id: "100012",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
          ],
        },
      ],
    },
    {
      category: "Testxxx13",
      order: 50,
      groups: [
        {
          group_name: "Test By Volume",
          indicators: [
            {
              id: "100013",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
          ],
        },
      ],
    },
    {
      category: "Testxxx14",
      order: 50,
      groups: [
        {
          group_name: "Test By Volume",
          indicators: [
            {
              id: "100014",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
          ],
        },
      ],
    },
    {
      category: "Testxxx15",
      order: 50,
      groups: [
        {
          group_name: "Test By Volume",
          indicators: [
            {
              id: "100015",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
          ],
        },
      ],
    },
    {
      category: "Testxxx16",
      order: 50,
      groups: [
        {
          group_name: "Test By Volume",
          indicators: [
            {
              id: "100016",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
          ],
        },
      ],
    },
    {
      category: "Testxxx17",
      order: 50,
      groups: [
        {
          group_name: "Test By Volume",
          indicators: [
            {
              id: "100017",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
          ],
        },
      ],
    },
    {
      category: "Testxxx18",
      order: 50,
      groups: [
        {
          group_name: "Test By Volume",
          indicators: [
            {
              id: "100018",
              created_at: "2024-11-24T19:22:57+08:00",
              updated_at: "2024-11-24T19:39:18+08:00",
              name: "Trade USD PBV",
              category: "Default",
              handler_name: "trade_usd_pbv",
              group_name: "Price By Volume",
              type: "y_bar_stack",
              required_level: 3,
              description: "USD trade price by volume",
              is_active: true,
              param_schema: "",
            },
          ],
        },
      ],
    },
  ]);
}
