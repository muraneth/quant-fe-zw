import { getTopWalletList, WalletBaseInfo } from "@/service/wallets";
import { useRequest } from "ahooks";
import { useImmer } from "use-immer";
import { useChartStore } from "@/store/charts";
import { Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

const WalletTable = () => {
  const [walletList, setWalletList] = useImmer<WalletBaseInfo[]>([]);
  const tokenInfo = useChartStore.use.tokenInfo();

  // Format number with commas and decimal places
  const formatNumber = (num: number, decimals = 2) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  // Format currency with USD symbol
  const formatUSD = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num);
  };

  const columns: ColumnsType<WalletBaseInfo> = [
    {
      title: "Wallet Address",
      dataIndex: "wallet_address",
      key: "wallet_address",
      fixed: "left",
      width: 280,
      render: (text: string) => (
        <Typography.Text copyable>{text}</Typography.Text>
      ),
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      width: 120,
      render: (value: number) => formatNumber(value),
      sorter: (a, b) => a.balance - b.balance,
    },
    {
      title: "%",
      dataIndex: "percentage",
      key: "percentage",
      width: 80,
      render: (value: number) => `${formatNumber(value)}%`,
      sorter: (a, b) => a.percentage - b.percentage,
    },
    {
      title: "Balance USD",
      dataIndex: "balance_usd",
      key: "balance_usd",
      width: 120,
      render: (value: number) => formatUSD(value),
      sorter: (a, b) => a.balance_usd - b.balance_usd,
    },
    {
      title: "Token/Day",
      className: "no-wrap-header",
      children: [
        {
          title: "Total",
          dataIndex: "total_token_day",
          key: "total_token_day",
          width: 120,
          render: (value: number) => formatNumber(value),
        },
        {
          title: "Avg",
          dataIndex: "avg_token_day",
          key: "avg_token_day",
          width: 120,
          render: (value: number) => formatNumber(value),
        },
      ],
    },
    {
      title: "Cost",
      children: [
        {
          title: "Avg Cost",
          dataIndex: "avg_cost",
          key: "avg_cost",
          width: 120,
          render: (value: number) => formatUSD(value),
        },
        {
          title: "Total",
          dataIndex: "total_cost",
          key: "total_cost",
          width: 120,
          render: (value: number) => formatUSD(value),
        },
      ],
    },
    {
      title: "PNL",
      children: [
        {
          title: "Total",
          dataIndex: "total_pnl",
          key: "total_pnl",
          width: 120,
          render: (value: number) => (
            <Typography.Text type={value >= 0 ? "success" : "danger"}>
              {formatUSD(value)}
            </Typography.Text>
          ),
        },
        {
          title: "Unrealized",
          dataIndex: "unrealized_pnl",
          key: "unrealized_pnl",
          width: 120,
          render: (value: number) => (
            <Typography.Text type={value >= 0 ? "success" : "danger"}>
              {formatUSD(value)}
            </Typography.Text>
          ),
        },
      ],
    },
    {
      title: "Txs",
      dataIndex: "total_txs",
      key: "total_txs",
      width: 80,
      fixed: "right",
      render: (value: number) => formatNumber(value, 0),
    },
  ];

  useRequest(
    () =>
      getTopWalletList({
        symbol: tokenInfo.symbol,
        chain: tokenInfo.chain,
        order_by: "balance",
        start_time: "2024-12-01",
      }),
    {
      onSuccess: (data) => {
        setWalletList(() => data);
      },
    }
  );

  return (
    <div>
      <Table
        columns={columns}
        dataSource={walletList}
        rowKey="wallet_address"
        scroll={{ x: "max-content" }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
        sticky
      />
    </div>
  );
};

export default WalletTable;
