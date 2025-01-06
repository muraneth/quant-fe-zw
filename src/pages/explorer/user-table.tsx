import { useMemo } from "react";
import { Table, Button } from "antd";
import { useRequest } from "ahooks";
import {
  getUserConfig,
  getTokenSnap,
  TokenSnapReq,
  deleteUserToken,
} from "@/service/explorer";
import { TokenDetailInfo } from "@/service/charts";
import { TokenBaseInfo } from "@/service/base";
import { useImmer } from "use-immer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { TablePaginationConfig } from "antd/es/table";
import { useExplorerStore } from "@/store/explorer";
import { createDynamicColumns } from "./common";
const UserTokenTable = () => {
  const [tokenDetailList, setTokenDetailList] = useImmer<
    Array<TokenDetailInfo>
  >([]);
  const [currentPage, setCurrentPage] = useImmer(1);
  const userConfig = useExplorerStore.use.userConfig();
  const [existingToken, setExistingToken] = useImmer<Array<string>>([]);

  const setDraftData = useExplorerStore.use.setDraftData();
  const navigate = useNavigate();

  useRequest(() => getUserConfig(), {
    onSuccess: (res) => {
      setDraftData((draft) => {
        draft.userConfig = res;
      });
    },
  });
  const removeToken = (key: string) =>
    setDraftData((draft) => {
      if (!draft.userConfig.tokens) return;
      draft.userConfig.tokens = draft.userConfig.tokens.filter(
        (token) => token.symbol + "_" + token.chain !== key
      );
    });
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleRemoveRow = async (token: TokenBaseInfo) => {
    setTokenDetailList((prev) =>
      prev.filter((item) => item.base_info.symbol !== token.symbol)
    );
    const newTokenList = existingToken.filter(
      (item) => item !== token.symbol + "_" + token.chain
    );

    setExistingToken(newTokenList);
    removeToken(token.symbol + "_" + token.chain);
    await deleteUserToken({
      symbol: token.symbol,
      chain: token.chain,
    });
  };

  const paginationConfig: TablePaginationConfig = {
    total: tokenDetailList.length,
    pageSize: 20,
    current: currentPage,
    onChange: handlePageChange,
    showSizeChanger: false, // Disable page size changing
    showTotal: (total) => `Total ${total} items`,
    position: ["bottomCenter"],
    // showQuickJumper: true, // Allow quick jump to page
  };

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    if (!userConfig.indicators || !userConfig.tokens) return;

    console.log("userConfig", userConfig);

    const indReqTemp = userConfig.indicators.map((ind) => ({
      handle_name: ind.handle_name,
    }));
    const keys = userConfig.tokens.map(
      (item) => item.symbol + "_" + item.chain
    );

    setExistingToken(keys);

    const processTokens = async () => {
      const hasIndicatorsChanged =
        tokenDetailList.length > 0 &&
        tokenDetailList[0].indicator_snaps.length !==
          userConfig.indicators.length;

      if (hasIndicatorsChanged) {
        setTokenDetailList([]);

        for (const token of userConfig.tokens) {
          try {
            const result = await runGetTokenSnap({
              symbol: token.symbol,
              indicators: indReqTemp,
            } as TokenSnapReq);

            setTokenDetailList((prev) => [...prev, result]);
            // await sleep(100);
          } catch (error) {
            console.error(`Error processing token ${token}:`, error);
          }
        }
      } else {
        const existingTokens = new Set(
          tokenDetailList.map(
            (item) => item.base_info.symbol + "_" + item.base_info.chain
          )
        );
        setTokenDetailList((prev) =>
          prev.filter((item) =>
            keys.includes(item.base_info.symbol + "_" + item.base_info.chain)
          )
        );
        for (const token of userConfig.tokens) {
          const key = token.symbol + "_" + token.chain;
          if (existingTokens.has(key)) continue;
          try {
            const result = await runGetTokenSnap({
              symbol: token.symbol,
              indicators: indReqTemp,
            } as TokenSnapReq);

            setTokenDetailList((prev) => [...prev, result]);
            // await sleep(100);
          } catch (error) {
            console.error(`Error processing token ${token}:`, error);
          }
        }
      }
    };

    processTokens();
  }, [userConfig]);

  const { runAsync: runGetTokenSnap } = useRequest(getTokenSnap, {
    manual: true,
  });
  const dynamicColumns = createDynamicColumns(tokenDetailList);

  const columns = useMemo(() => {
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
                `/studio?symbol=${baseInfo.symbol}&handle_name=holder.all&chain=${baseInfo.chain}`
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
    ];

    return [
      ...baseColumns,
      ...dynamicColumns,
      {
        title: "Actions",
        key: "actions",
        width: "120px",
        render: (_: any, record: TokenDetailInfo) => (
          <Button danger onClick={() => handleRemoveRow(record.base_info)}>
            Remove
          </Button>
        ),
      },
    ];
  }, [tokenDetailList]);

  return (
    <div style={{background:"#0b0e1b"}}>
     
      <Table
        columns={columns}
        dataSource={tokenDetailList}
        rowKey={(record) =>
          record.base_info.symbol + "_" + record.base_info.chain
        }
        
        bordered
        scroll={{ x: "max-content", y: 600 }}
        pagination={paginationConfig}
      />
    </div>
  );
};

export default UserTokenTable;
