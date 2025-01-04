import { useMemo } from "react";
import { Table, Button } from "antd";
import { useRequest } from "ahooks";
import {
  getUserConfig,
  getTokenSnap,
  TokenSnapReq,
  saveUserConfig,
} from "@/service/explorer";
import {
  TokenDetailInfo,
  TokenBaseInfo,
} from "@/service/charts";
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleRemoveRow = async (symbol: string) => {
    setTokenDetailList((prev) =>
      prev.filter((item) => item.base_info.symbol !== symbol)
    );
    const newTokenList = existingToken.filter(item => item !== symbol);
  
    setExistingToken(newTokenList);
  
    await saveUserConfig({
      tokens: newTokenList,
      indicators: userConfig.indicators.map((ind) => ind.handle_name),
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
  
    const indReqTemp = userConfig.indicators.map(ind => ({
      handle_name: ind.handle_name,
    }));
  
    setExistingToken(userConfig.tokens);
  
    const processTokens = async () => {
      const hasIndicatorsChanged = tokenDetailList.length > 0 && 
        tokenDetailList[0].indicator_snaps.length !== userConfig.indicators.length;
  
      if (hasIndicatorsChanged) {
        setTokenDetailList([]);
        
        for (const token of userConfig.tokens) {
          try {
            const result = await runGetTokenSnap({
              symbol: token,
              indicators: indReqTemp,
            } as TokenSnapReq);
  
            setTokenDetailList(prev => [...prev, result]);
            await sleep(100);
          } catch (error) {
            console.error(`Error processing token ${token}:`, error);
          }
        }
      } else {
        const existingTokens = new Set(
          tokenDetailList.map(item => item.base_info.symbol)
        );
        setTokenDetailList(prev => 
          prev.filter(item => userConfig.tokens.includes(item.base_info.symbol))
        );
        for (const token of userConfig.tokens) {
          if (existingTokens.has(token)) continue;
          try {
            const result = await runGetTokenSnap({
              symbol: token,
              indicators: indReqTemp,
            } as TokenSnapReq);
  
            setTokenDetailList(prev => [...prev, result]);
            await sleep(100);
          } catch (error) {
            console.error(`Error processing token ${token}:`, error);
          }
        }
      }
    };
  
    processTokens();
  }, [userConfig]);

  const { runAsync: runGetTokenSnap } = useRequest(
    getTokenSnap,
    {
      manual: true,
    }
  );
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
          <Button
            danger
            onClick={() => handleRemoveRow(record.base_info.symbol)}
          >
            Remove
          </Button>
        ),
      },
    ];
  }, [tokenDetailList]);

  return (
    <div>
      <Table
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

export default UserTokenTable;
