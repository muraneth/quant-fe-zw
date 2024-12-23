import  { useMemo } from "react";
import { Table } from "antd";
import { useRequest } from "ahooks";
import { getTokenDetailList } from "@/service/studio-home";
import { TokenDetailInfo ,TokenBaseInfo} from "@/service/charts";
import { useImmer } from "use-immer";
import { formatNumber } from "@/utils/common";
import { useNavigate } from "react-router-dom";
const TokenTable = () => {
  const [tokenDetailList, setTokenDetailList] = useImmer<Array<TokenDetailInfo>>([]);
  const navigate = useNavigate();

  const { loading: getTableLoading } = useRequest(
    () => {
      return getTokenDetailList();
    },
    {
      refreshDeps: [],
      onSuccess: (res) => {
        setTokenDetailList(res);
      },
    }
  );

  const columns = useMemo(() => {
    // Base columns for token info
    const baseColumns = [
      {
        title: "Token",
        dataIndex: "base_info",
        key: "token",
        render: (baseInfo:TokenBaseInfo) => (
          <div style={{ display: "flex", alignItems: "center", cursor:  "pointer"  }}
          onClick={() => {
            
              navigate(`/charts?symbol=${baseInfo.symbol}&handle_name=holder.all`);
            
          }}>
            
            <img
              src={baseInfo.icon_url}
              alt={baseInfo.symbol}
              style={{ width: 24, height: 24, marginRight: 8, borderRadius: "50%" }}
            />
            <span>{baseInfo.symbol}</span>
          </div>
        ),
      },
      {
        title: "Create Time",
        dataIndex: ["base_info", "create_time"],
        key: "create_time",
        render: (createTime:string) => new Date(createTime).toLocaleString(),
      },
    ];

    // Dynamic columns for indicator_snaps
    const dynamicColumns = tokenDetailList[0]?.indicator_snaps?.map((indicator, index) => ({
      title: indicator.name,
      key: `indicator_${index}`,
      sorter: (a:TokenDetailInfo, b:TokenDetailInfo) => {
        const snapA = a.indicator_snaps?.find((snap) => snap.name === indicator.name);
        const snapB = b.indicator_snaps?.find((snap) => snap.name === indicator.name);
        return (snapA?.value || 0) - (snapB?.value || 0);
      },
      render: (_:any, record:TokenDetailInfo) => {
        const snap = record.indicator_snaps?.find((snap) => snap.name === indicator.name);
        const baseInfo = record.base_info;
        return snap ? (
            <div
            style={{ cursor: snap.handle_name ? "pointer" : "default", color: snap.handle_name ? "gray" : "inherit" }}
            onClick={() => {
              if (snap.handle_name) {
                navigate(`/charts?symbol=${baseInfo.symbol}&handle_name=${snap.handle_name}`);
              }
            }}
          >
            <div>{formatNumber(snap.value)}</div>
            {
            snap.value_chg !== undefined && snap.value_chg !== 0.0  && (
              <div style={{ color: snap.value_chg > 0 ? "#36F097" : "#EB5757" }}>
                {snap.value_chg >= 0 ? "+" : ""}
                {formatNumber(snap.value_chg * 100)}%
              </div>
            )
          }

          </div>
        ) : null;
      },
    })) || [];

    return [...baseColumns, ...dynamicColumns];
  }, [tokenDetailList]);

  return (
    <div style={{marginLeft:'10px',marginRight:'10px'}}>
      <Table
        columns={columns}
        dataSource={tokenDetailList}
        rowKey={(record) => record.base_info.contract_address}
        loading={getTableLoading}
        bordered
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default TokenTable;
