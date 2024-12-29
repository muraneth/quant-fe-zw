import React, { useMemo } from "react";
import { Table } from "antd";
import { useRequest } from "ahooks";
import {
  getUserConfig,
  getTokenSnap,
  TokenSnapReq,
  getTokenByPage,
  getDefaultIndList,
  saveUserConfig,
  SaveUserConfig,
} from "@/service/explorer";
import {
  TokenDetailInfo,
  TokenBaseInfo,
  IndicatorDetailReqDto,
  Indicator,
} from "@/service/charts";
import { useImmer } from "use-immer";
import { formatNumber } from "@/utils/common";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { TablePaginationConfig } from "antd/es/table";
import { useExplorerStore } from "@/store/explorer";
import { set } from "lodash-es";

const TokenTable = () => {
  const [tokenDetailList, setTokenDetailList] = useImmer<
    Array<TokenDetailInfo>
  >([]);
  const [currentPage, setCurrentPage] = useImmer(1);
  const [tokenList, setTokenList] = useImmer<Array<TokenBaseInfo>>([]);
  const [totalToken, setTotalToken] = useImmer(0);
  const [indicatorList, setIndicatorList] = useImmer<Array<Indicator>>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useImmer<string[]>([]);
  const userConfig = useExplorerStore.use.userConfig();
  const setDraftData = useExplorerStore.use.setDraftData();
  const navigate = useNavigate();

  useRequest(() => getTokenByPage({ page: currentPage, page_size: 10 }), {
    onSuccess: (res) => {
      setTotalToken(res.total);
      setTokenList(res.tokens);
    },
    refreshDeps: [currentPage],
  });
  useRequest(() => getDefaultIndList(), {
    onSuccess: (res) => {
      setIndicatorList(res);
    },
  });
  useRequest(
    () =>
      saveUserConfig({
        tokens: [...userConfig.tokens, ...selectedRowKeys],
        indicators: indicatorList.map((ind) => ind.handle_name),
      } as SaveUserConfig),
    {
      refreshDeps: [selectedRowKeys],
    }
  );

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
  };

  const paginationConfig: TablePaginationConfig = {
    total: totalToken,
    pageSize: 20,
    current: currentPage,
    onChange: handlePageChange,
    showSizeChanger: false, // Disable page size changing
    showTotal: (total) => `Total ${total} items`,
    position: ["bottomCenter"],
    // showQuickJumper: true, // Allow quick jump to page
  };

  React.useEffect(() => {
    setSelectedRowKeys(userConfig.tokens);
  }, [userConfig]);
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys as string[]);
      //   setDraftData((draft) => {
      //     draft.userConfig.tokens = [
      //       ...userConfig.tokens,
      //       ...newSelectedRowKeys,
      //     ] as Array<string>;
      //   });
    },
  };
  useEffect(() => {
    if (indicatorList && tokenList) {
      const indReqTemp = [] as Array<IndicatorDetailReqDto>;
      for (const ind of indicatorList) {
        indReqTemp.push({
          handle_name: ind.handle_name,
        });
      }

      const processTokens = async () => {
        for (const token of tokenList) {
          try {
            const result = await runGetTokenSnap({
              symbol: token.symbol,
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
  }, [indicatorList, tokenList]);

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
        width: "240px",
        render: (baseInfo: TokenBaseInfo) => (
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => {
              navigate(
                `/charts?symbol=${baseInfo.symbol}&handle_name=holder.all&type=independent_line&chain=${baseInfo.chain}`
              );
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
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
                <span
                  style={{
                    color: "gray",
                    fontSize: "12px",
                    marginLeft: "10px",
                  }}
                >
                  {baseInfo.contract_address.slice(0, 6) +
                    "..." +
                    baseInfo.contract_address.slice(-6)}
                </span>
              </div>
              <span
                style={{ color: "gray", fontSize: "12px", marginLeft: "30px" }}
              >
                {baseInfo.name}
              </span>
            </div>
          </div>
        ),
      },
      {
        title: "Create Time",
        dataIndex: ["base_info", "create_time"],
        key: "create_time",
        width: "120px",
        render: (createTime: string) =>
          new Date(createTime).toLocaleDateString(),
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
                    `/charts?symbol=${baseInfo.symbol}&handle_name=${snap.handle_name}&type=${snap.type}&chain=${baseInfo.chain}`
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
    <div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tokenDetailList}
        rowKey={(record) => record.base_info.symbol}
        bordered
        scroll={{ x: "max-content" }}
        pagination={paginationConfig}
      />
    </div>
  );
};

export default TokenTable;
