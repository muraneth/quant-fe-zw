import { useMemo } from "react";
import { Table } from "antd";
import { useRequest } from "ahooks";
import {
  getUserConfig,
  getTokenSnap,
  UserConfig,
  TokenSnapReq,
} from "@/service/explorer";
import {
  TokenDetailInfo,
  TokenBaseInfo,
  IndicatorDetailReqDto,
} from "@/service/charts";
import { useImmer } from "use-immer";
import { formatNumber } from "@/utils/common";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TokenTable = () => {
  const [tokenDetailList, setTokenDetailList] = useImmer<
    Array<TokenDetailInfo>
  >([]);
  const [userConfig, setUserConfig] = useImmer<UserConfig>({} as UserConfig);
  const navigate = useNavigate();
  const [dyColumns, setDyColumns] = useImmer([]);
  useRequest(() => getUserConfig(), {
    onSuccess: (res) => {
      setUserConfig(res);
    },
  });

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (userConfig.indicators && userConfig.tokens) {
      const indReqTemp = [] as Array<IndicatorDetailReqDto>;
      for (const ind of userConfig.indicators) {
        indReqTemp.push({
          handle_name: ind.handle_name,
        });
        setDyColumns((prev) => {
          return [
            ...prev,
            {
              title: ind.name,
              key: ind.handle_name,
              // sorter: (a, b) => {
              //   const snapA = a.indicator_snaps?.find((snap) => snap.name === indicator.name);
              //   const snapB = b.indicator_snaps?.find((snap) => snap.name === indicator.name);
              //   return (snapA?.value || 0) - (snapB?.value || 0);
              // },
              render: (_: any, record: TokenDetailInfo) => {
                const snap = record.indicator_snaps?.find(
                  (snap) => snap.name === ind.name
                );
                const baseInfo = record.base_info;
                return snap ? (
                  <div
                    style={{
                      cursor: snap.handle_name ? "pointer" : "default",
                      color: snap.handle_name ? "gray" : "inherit",
                    }}
                    onClick={() => {
                      if (snap.handle_name) {
                        navigate(
                          `/charts?symbol=${baseInfo.symbol}&handle_name=${
                            snap.handle_name
                          }&type=${"independent_line"}`
                        );
                      }
                    }}
                  >
                    <div>{formatNumber(snap.value)}</div>
                    {snap.value_chg !== undefined && snap.value_chg !== 0.0 && (
                      <div
                        style={{
                          color: snap.value_chg > 0 ? "#36F097" : "#EB5757",
                        }}
                      >
                        {snap.value_chg >= 0 ? "+" : ""}
                        {formatNumber(snap.value_chg * 100)}%
                      </div>
                    )}
                  </div>
                ) : null;
              },
            },
          ];
        });
      }

      const processTokens = async () => {
        for (const token of userConfig.tokens) {
          try {
            const result = await runGetTokenSnap({
              symbol: token,
              indicators: indReqTemp,
            } as TokenSnapReq);

            setTokenDetailList((prev) => {
              if (
                !prev.some(
                  (item) =>
                    item.base_info.contract_address ===
                    result.base_info.contract_address
                )
              ) {
                return [...prev, result];
              }
              return prev;
            });

            await sleep(100);
          } catch (error) {
            console.error(`Error processing token ${token}:`, error);
          }
        }
      };

      processTokens();
    }
  }, [userConfig]);

  const { runAsync: runGetTokenSnap, loading: tokenIndLoading } = useRequest(
    getTokenSnap,
    {
      manual: true,
    }
  );

  const columns = useMemo(() => {
    // Base columns for token info
    console.log("tokenDetailList", tokenDetailList);

    const baseColumns = [
      {
        title: "Token",
        dataIndex: "base_info",
        key: "token",
        render: (baseInfo: TokenBaseInfo) => (
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => {
              navigate(
                `/charts?symbol=${baseInfo.symbol}&handle_name=holder.all&type=independent_line`
              );
            }}
          >
            <img
              src={baseInfo.icon_url}
              alt={baseInfo.symbol}
              style={{
                width: 24,
                height: 24,
                marginRight: 8,
                borderRadius: "50%",
              }}
            />
            <span>{baseInfo.symbol}</span>
            <span style={{ color: "gray", marginLeft: 8 }}>
              {baseInfo.name}
            </span>
          </div>
        ),
      },
      {
        title: "Create Time",
        dataIndex: ["base_info", "create_time"],
        key: "create_time",
        render: (createTime: string) => new Date(createTime).toLocaleString(),
      },
    ];
    const dynamicColumns =
      tokenDetailList[0]?.indicator_snaps?.map((indicator, index) => ({
        title: indicator.name,
        key: `indicator_${index}`,
        sorter: (a: TokenDetailInfo, b: TokenDetailInfo) => {
          const snapA = a.indicator_snaps?.find(
            (snap) => snap.name === indicator.name
          );
          const snapB = b.indicator_snaps?.find(
            (snap) => snap.name === indicator.name
          );
          return (snapA?.value || 0) - (snapB?.value || 0);
        },
        render: (_: any, record: TokenDetailInfo) => {
          const snap = record.indicator_snaps?.find(
            (snap) => snap.name === indicator.name
          );
          const baseInfo = record.base_info;
          return snap ? (
            <div
              style={{
                cursor: snap.handle_name ? "pointer" : "default",
                color: snap.handle_name ? "gray" : "inherit",
              }}
              onClick={() => {
                if (snap.handle_name) {
                  navigate(
                    `/charts?symbol=${baseInfo.symbol}&handle_name=${snap.handle_name}`
                  );
                }
              }}
            >
              <div>{formatNumber(snap.value)}</div>
              <span
                style={{ color: snap.value_chg >= 0 ? "#36F097" : "#EB5757" }}
              >
                {formatNumber(snap.value_chg * 100)}%
              </span>
            </div>
          ) : null;
        },
      })) || [];
    return [...baseColumns, ...dynamicColumns];
  }, [tokenDetailList]);

  return (
    <div style={{ marginLeft: "10px", marginRight: "10px" }}>
      <Table
        columns={columns}
        dataSource={tokenDetailList}
        rowKey={(record) => record.base_info.contract_address}
        // loading={tokenIndLoading}
        bordered
        scroll={{ x: "max-content", y: 800 }}
        pagination={false}
      />
    </div>
  );
};

export default TokenTable;
