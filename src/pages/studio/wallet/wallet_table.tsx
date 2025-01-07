import { getTopWalletList, WalletBaseInfo } from "@/service/wallets";
import { useRequest } from "ahooks";
import { useImmer } from "use-immer";
import { useChartStore } from "@/store/charts";
import { Table, Typography, Segmented } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { formatNumber, getUserInfo } from "@/utils/common";
import { getTimeBefore } from "@/utils/time";
import MaskGuide from "./mask-guide";
import { get } from "http";
const TOP_OPTIONS = {
  TOP_50: 50,
  TOP_100: 100,
  TOP_500: 500,
};
const TOP_OPTIONS2 = [
  { label: 'TOP_50', value: "TOP_50", requiredLevel: 0,disabled:false }, // Free tier
  { label: 'TOP_100', value: "TOP_100", requiredLevel: 2,disabled:true }, // Paid tier
  { label: 'TOP_500', value: "TOP_500", requiredLevel: 3,disabled:true }  // Premium tier
];
const getOptions = (userLevel:number) => {
  if (!userLevel) {
    return TOP_OPTIONS2;
  }
  for (const option of TOP_OPTIONS2) {
    if (userLevel >= option.requiredLevel) {
      option.disabled = false;
    } else {
      option.disabled = true;
    }
  }
  return TOP_OPTIONS2;
}

type TopOption = keyof typeof TOP_OPTIONS;

const WalletTable = () => {
  const [walletList, setWalletList] = useImmer<WalletBaseInfo[]>([]);
  const tokenInfo = useChartStore.use.tokenInfo();
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  const [selectedSize, setSelectedSize] = useImmer<TopOption>("TOP_50");
  const options =getOptions(userInfo.level);
  const { loading: walleTableLoading } = useRequest(
    () =>  {
      if (!tokenInfo || !tokenInfo.symbol || !tokenInfo.chain) {
        return Promise.resolve([]);
      }
      return getTopWalletList({
        symbol: tokenInfo.symbol,
        chain: tokenInfo.chain,
        order_by: "balance",
        start_time: getTimeBefore(1),
        top_count:TOP_OPTIONS[selectedSize]
      })
    }         
      ,
    {
      refreshDeps: [tokenInfo, selectedSize],
      onSuccess: (data) => {
        setWalletList(() => data);
      },
    }
  );

  const handleRowClick = (record: WalletBaseInfo) => {
    navigate(
      `/studio?symbol=${tokenInfo.symbol}&chain=${tokenInfo.chain}&tab=wallet&wallet_address=${record.wallet_address}`
    );
  };
  const checkIfUserPaid = () => {
     return userInfo.level > 1;
  }
  const columns: ColumnsType<WalletBaseInfo> = [
    {
      title: "Wallet Address",
      dataIndex: "wallet_address",
      key: "wallet_address",
      fixed: "left",
      width: 100,
      render: (text: string) => {
        const shortenedAddress = `${text.slice(0, 6)}...${text.slice(-6)}`;
        return <Typography.Text copyable={{ text: text }}>{shortenedAddress}</Typography.Text>;
      },
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      width: 80,
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
      width: 80,
      render: (value: number) => formatNumber(value),
      sorter: (a, b) => a.balance_usd - b.balance_usd,
    },
  
    {
      title: "Avg Token/Day",
      dataIndex: "avg_token_day",
      key: "avg_token_day",
      width: 80,
      render: (value: number) => formatNumber(value),
      sorter: (a, b) => a.avg_token_day - b.avg_token_day,
    },
    {
      title: "Avg Cost",
      dataIndex: "avg_cost",
      key: "avg_cost",
      width: 80,
      render: (value: number) => formatNumber(value),
      sorter: (a, b) => a.avg_cost - b.avg_cost,
    },
    {
      title: "Total Cost",
      dataIndex: "total_cost",
      key: "total_cost",
      width: 80,
      render: (value: number) => formatNumber(value),
      sorter: (a, b) => a.total_cost - b.total_cost,
    },
    {
      title: "Total PNL",
      dataIndex: "total_pnl",
      key: "total_pnl",
      width: 80,
      render: (value: number) => (
        <Typography.Text type={value >= 0 ? "success" : "danger"}>
          {formatNumber(value)}
        </Typography.Text>
      ),
      sorter: (a, b) => a.total_pnl - b.total_pnl,
    },
    {
      title: "Unrealized PNL",
      dataIndex: "unrealized_pnl",
      key: "unrealized_pnl",
      width: 80,
      render: (value: number) => (
        <Typography.Text type={value >= 0 ? "success" : "danger"}>
          {formatNumber(value)}
        </Typography.Text>
      ),
      sorter: (a, b) => a.unrealized_pnl - b.unrealized_pnl,
    },

    {
      title: "Txs In",
      dataIndex: "tx_in_count",
      key: "tx_in_count",
      width: 80,

      render: (value: number) => value,
      sorter: (a, b) => a.tx_in_count - b.tx_in_count,
    },
    {
      title: "Txs Out",
      dataIndex: "tx_out_count",
      key: "tx_out_count",
      width: 80,
      render: (value: number) => value,
      sorter: (a, b) => a.tx_out_count - b.tx_out_count,
    },
    {
      title: "Win Rate",
      dataIndex: "win_rate",
      key: "win_rate",
      width: 80,
      render: (value: number) => `${formatNumber(value * 100)}%`,
      sorter: (a, b) => a.win_rate - b.win_rate,
    },

    {
      title: "Txs",
      dataIndex: "total_txs",
      key: "total_txs",
      width: 80,
      fixed: "right",
      render: (value: number) => value,
      sorter: (a, b) => a.total_txs - b.total_txs,
    },
  ];
  const handleSizeChange = (value: TopOption) => {
    setSelectedSize(value);
  };
  return (
    <div>
      <div  style={{display:"flex", justifyContent:"flex-end"}}>
        <Segmented
            options={options}
            value={selectedSize}
            onChange={(value) => handleSizeChange(value as TopOption)}
            disabled={walleTableLoading}
          />
      </div>
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
            line-height: 28px !important;
          }
          .ant-table-row {
            cursor: pointer;
          }
          .ant-table-row:hover {
            background-color: rgba(0, 0, 0, 0.02);
          }
          
          /* Ensure header remains clickable */
          .ant-table-header {
            z-index: 11;
            position: relative;
          }
        `}
      </style>
      <Table
        columns={columns}
        dataSource={walletList}
        rowKey="wallet_address"
        scroll={{ x: 1600, y: 600 }}
        pagination={false}  
        // pagination={{
        //   pageSize: 10,
        //   showSizeChanger: true,
        //   showTotal: (total) => `Total ${total} items`,
        // }}
        loading={walleTableLoading}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        sticky
      />
      {!checkIfUserPaid() && (
        <MaskGuide type="table"/>
      )}
    </div>
  );
};

export default WalletTable;
