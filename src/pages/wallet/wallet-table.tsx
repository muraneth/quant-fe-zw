import React from 'react';
import { Table, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface TokenData {
  token: string;
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
  tx_out_count: number;
  tx_in_count: number;
  WalletDailyInfo: null;
}

const TokenTable: React.FC = () => {
  const data: TokenData[] = [
    {
      token: "MSTR",
      wallet_address: "0x48d93dabf29aa5d86424a90ee60f419f1837649f",
      balance: 1086961.01,
      percentage: 0.0517600480952381,
      balance_usd: 2484197.45,
      total_token_day: 30728387.75,
      avg_token_day: 28.27,
      avg_cost: 0.7832177986,
      total_cost: 851327.21,
      total_pnl: 0,
      unrealized_pnl: 1632870.2375286398,
      total_txs: 154,
      tx_out_count: 0,
      tx_in_count: 154,
      WalletDailyInfo: null
    },
    {
      token: "MSTR",
      wallet_address: "0x318ba85ca49a3b12d3cf9c72cc72b29316971802",
      balance: 522407.69,
      percentage: 0.024876556666666667,
      balance_usd: 1193937.82,
      total_token_day: 18284269.31,
      avg_token_day: 35,
      avg_cost: 1.2004468882,
      total_cost: 627122.69,
      total_pnl: 0,
      unrealized_pnl: 566815.13,
      total_txs: 90097,
      tx_out_count: 50168,
      tx_in_count: 39929,
      WalletDailyInfo: null
    }
  ];

  const columns: ColumnsType<TokenData> = [
    {
      title: 'Token',
      dataIndex: 'token',
      key: 'token',
    },
    {
      title: 'Wallet Address',
      dataIndex: 'wallet_address',
      key: 'wallet_address',
      render: (address: string) => (
        <span style={{ fontFamily: 'monospace' }}>{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
      ),
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (value: number) => value.toLocaleString(undefined, { minimumFractionDigits: 2 }),
      sorter: (a: TokenData, b: TokenData) => a.balance - b.balance,
    },
    {
      title: 'Balance USD',
      dataIndex: 'balance_usd',
      key: 'balance_usd',
      render: (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      sorter: (a: TokenData, b: TokenData) => a.balance_usd - b.balance_usd,
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (value: number) => `${(value * 100).toFixed(2)}%`,
      sorter: (a: TokenData, b: TokenData) => a.percentage - b.percentage,
    },
    {
      title: 'Avg Cost',
      dataIndex: 'avg_cost',
      key: 'avg_cost',
      render: (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      sorter: (a: TokenData, b: TokenData) => a.avg_cost - b.avg_cost,
    },
    {
      title: 'Total Cost',
      dataIndex: 'total_cost',
      key: 'total_cost',
      render: (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      sorter: (a: TokenData, b: TokenData) => a.total_cost - b.total_cost,
    },
    {
      title: 'Unrealized PnL',
      dataIndex: 'unrealized_pnl',
      key: 'unrealized_pnl',
      render: (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      sorter: (a: TokenData, b: TokenData) => a.unrealized_pnl - b.unrealized_pnl,
    },
    {
      title: 'Total Transactions',
      dataIndex: 'total_txs',
      key: 'total_txs',
      render: (value: number) => value.toLocaleString(),
      sorter: (a: TokenData, b: TokenData) => a.total_txs - b.total_txs,
    }
  ];

  return (
    <Card>
      <Table<TokenData>
        dataSource={data}
        columns={columns}
        pagination={false}
        scroll={{ x: true }}
        rowKey="wallet_address"
      />
    </Card>
  );
};

export default TokenTable;