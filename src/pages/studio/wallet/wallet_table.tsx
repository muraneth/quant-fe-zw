import { getTopWalletList, WalletBaseInfo } from "@/service/wallets";
import { useRequest } from "ahooks";
import { useImmer } from "use-immer";
import { useChartStore } from "@/store/charts";
import { Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

const WalletTable = () => {
  const [walletList, setWalletList] = useImmer<WalletBaseInfo[]>([]);
  const tokenInfo = useChartStore.use.tokenInfo();
  const navigate = useNavigate();

  useRequest(
    () =>
      getTopWalletList({
        symbol: tokenInfo.symbol,
        chain: tokenInfo.chain,
        order_by: "balance",
        start_time: "2024-12-01",
      }),
    {
      refreshDeps: [tokenInfo],
      onSuccess: (data) => {
        setWalletList(() => data);
      },
    }
  );

  const formatNumber = (num: number, decimals = 2) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  const formatUSD = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num);
  };

  const handleRowClick = (record: WalletBaseInfo) => {
    navigate(`/studio?tab=wallet&wallet_address=${record.wallet_address}`);
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
      title: "Total Token/Day",
      dataIndex: "total_token_day",
      key: "total_token_day",
      width: 120,
      render: (value: number) => formatNumber(value),
      sorter: (a, b) => a.total_token_day - b.total_token_day,
    },
    {
      title: "Avg Token/Day",
      dataIndex: "avg_token_day",
      key: "avg_token_day",
      width: 120,
      render: (value: number) => formatNumber(value),
      sorter: (a, b) => a.avg_token_day - b.avg_token_day,
    },
    {
      title: "Avg Cost",
      dataIndex: "avg_cost",
      key: "avg_cost",
      width: 120,
      render: (value: number) => formatUSD(value),
      sorter: (a, b) => a.avg_cost - b.avg_cost,
    },
    {
      title: "Total Cost",
      dataIndex: "total_cost",
      key: "total_cost",
      width: 120,
      render: (value: number) => formatUSD(value),
      sorter: (a, b) => a.total_cost - b.total_cost,
    },
    {
      title: "Total PNL",
      dataIndex: "total_pnl",
      key: "total_pnl",
      width: 120,
      render: (value: number) => (
        <Typography.Text type={value >= 0 ? "success" : "danger"}>
          {formatUSD(value)}
        </Typography.Text>
      ),
      sorter: (a, b) => a.total_pnl - b.total_pnl,
    },
    {
      title: "Unrealized PNL",
      dataIndex: "unrealized_pnl",
      key: "unrealized_pnl",
      width: 120,
      render: (value: number) => (
        <Typography.Text type={value >= 0 ? "success" : "danger"}>
          {formatUSD(value)}
        </Typography.Text>
      ),
      sorter: (a, b) => a.unrealized_pnl - b.unrealized_pnl,
    },
    {
      title: "Txs",
      dataIndex: "total_txs",
      key: "total_txs",
      width: 80,
      fixed: "right",
      render: (value: number) => formatNumber(value, 0),
      sorter: (a, b) => a.total_txs - b.total_txs,
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      <style>
        {`
          .ant-table-cell {
            white-space: nowrap;
            padding: 8px 16px !important;
          }
          .ant-table-thead > tr > th {
            white-space: nowrap;
            padding: 12px 16px !important;
            height: 48px !important;
          }
          .ant-table-tbody > tr > td {
            height: 56px !important;  /* Adjust this value to change row height */
            line-height: 40px !important; /* Adjust this for vertical text alignment */
          }
          .ant-table-row {
            cursor: pointer;
          }
          .ant-table-row:hover {
            background-color: rgba(0, 0, 0, 0.02);
          }
          /* Make header row slightly darker for better distinction */
          
        `}
      </style>
      <Table
        columns={columns}
        dataSource={walletList}
        rowKey="wallet_address"
        scroll={{ x: 1600, y: 600 }}
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        sticky
      />
    </div>
  );
};

export default WalletTable;
