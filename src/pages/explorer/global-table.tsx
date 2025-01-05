import React, { useMemo, useEffect } from "react";
import { Table, Input } from "antd";
import { useRequest } from "ahooks";
import { useImmer } from "use-immer";
import { useNavigate } from "react-router-dom";
import { useExplorerStore } from "@/store/explorer";

import {
  getTokenSnap,
  getTokenByPage,
  getDefaultIndList,
  saveUserTokens,
  deleteUserToken,
} from "@/service/explorer";
import {
  TokenDetailInfo,
  IndicatorDetailReqDto,
  Indicator,
} from "@/service/charts";
import { TokenBaseInfo, BaseToken } from "@/service/base";
import { getUserInfo } from "@/utils/common";
import { createDynamicColumns } from "./common";

const PAGE_SIZE = 20;
const FETCH_DELAY = 0;

const TokenTable = () => {
  const [tokenDetailList, setTokenDetailList] = useImmer<
    Array<TokenDetailInfo>
  >([]);
  const [currentPage, setCurrentPage] = useImmer(1);
  const [tokenList, setTokenList] = useImmer<Array<TokenBaseInfo>>([]);
  const [totalToken, setTotalToken] = useImmer(0);
  const [indicatorList, setIndicatorList] = useImmer<Array<Indicator>>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useImmer<string[]>([]);
  const [isLoading, setIsLoading] = useImmer(false);
  const [searchKey, setSearchKey] = useImmer("");

  const userConfig = useExplorerStore.use.userConfig();
  const navigate = useNavigate();

  const { runAsync: runGetTokenSnap } = useRequest(getTokenSnap, {
    manual: true,
  });
  const userInfo = getUserInfo();
  const findTokenByKey = (key: string) => {
    const [symbol, chain] = key.split("_");
    return tokenDetailList.find(
      (token) =>
        token.base_info.symbol === symbol && token.base_info.chain === chain
    );
  };
  const findTokensByKeys = (keys: string[]): BaseToken[] => {
    const tk = keys
      .map((key) => findTokenByKey(key))
      .filter((token) => token !== undefined);

    return tk.map((token) => ({
      symbol: token.base_info.symbol,
      chain: token.base_info.chain,
    }));
  };

  useRequest(
    () =>
      getTokenByPage({
        key: searchKey,
        page: currentPage,
        page_size: PAGE_SIZE,
      }),
    {
      onSuccess: (res) => {
        setTotalToken(res.total);
        setTokenList(res.tokens);
      },
      refreshDeps: [currentPage, searchKey],
    }
  );

  useRequest(() => getDefaultIndList(), {
    onSuccess: (res) => {
      setIndicatorList(res);
    },
  });
  const handleSearch = (value: string) => {
    setSearchKey(value);
    setCurrentPage(1); // Reset to first page on search
  };

  useEffect(() => {
    const keys = userConfig.tokens.map(
      (item) => item.symbol + "_" + item.chain
    );
    setSelectedRowKeys(keys);
  }, [userConfig]);

  useEffect(() => {
    const fetchTokenDetails = async () => {
      if (!indicatorList.length || !tokenList.length) return;

      setIsLoading(true);
      setTokenDetailList([]);

      const indReqTemp: IndicatorDetailReqDto[] = indicatorList.map((ind) => ({
        symbol: "",
        chain: "",
        handle_name: ind.handle_name,
      }));

      for (const token of tokenList) {
        try {
          const result = await runGetTokenSnap({
            symbol: token.symbol,
            chain: token.chain,
            indicators: indReqTemp,
          });

          setTokenDetailList((prev) => [...prev, result]);
          await new Promise((resolve) => setTimeout(resolve, FETCH_DELAY));
        } catch (error) {
          console.error(`Error fetching token ${token.symbol}:`, error);
        }
      }

      setIsLoading(false);
    };

    fetchTokenDetails();
  }, [indicatorList, tokenList, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: async (newSelectedRowKeys: React.Key[]) => {
      if (!userInfo || !userInfo.uid) {
        console.error("User config not loaded");
        return;
      }
      setSelectedRowKeys(newSelectedRowKeys as string[]);

      // Compute unselected keys using new state directly
      const allRowKeys = tokenDetailList.map(
        (record) => record.base_info.symbol + "_" + record.base_info.chain
      );
      const unselectedKeys = allRowKeys.filter(
        (key) => !newSelectedRowKeys.includes(key)
      );

      console.log("Unselected Keys:", unselectedKeys);

      const tks = findTokensByKeys(newSelectedRowKeys as string[]);
      saveUserTokens({
        tokens: tks,
      });
      const unselectedTokens = findTokensByKeys(unselectedKeys);
      if (!unselectedTokens.length) return;
      for (const token of unselectedTokens) {
        deleteUserToken({ symbol: token.symbol, chain: token.chain });
      }
    },
  };
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
            onClick={() =>
              navigate(
                `/studio?symbol=${baseInfo.symbol}&handle_name=holder.all&chain=${baseInfo.chain}`
              )
            }
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
                  {`${baseInfo.contract_address.slice(
                    0,
                    6
                  )}...${baseInfo.contract_address.slice(-6)}`}
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

    return [...baseColumns, ...dynamicColumns];
  }, [tokenDetailList, navigate]);

  return (
    <div>
      <Input.Search
        placeholder="Search tokens"
        onSearch={handleSearch}
        style={{ maxWidth: 300, marginBottom: 16 }}
        allowClear
      />
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tokenDetailList}
        rowKey={(record) =>
          record.base_info.symbol + "_" + record.base_info.chain
        } // Add chain to avoid key conflict
        bordered
        loading={isLoading}
        scroll={{ x: "max-content" }}
        pagination={{
          total: totalToken,
          pageSize: PAGE_SIZE,
          current: currentPage,
          onChange: handlePageChange,
          showSizeChanger: false,
          showTotal: (total) => `Total ${total} items`,
          position: ["bottomCenter"],
        }}
      />
    </div>
  );
};

export default TokenTable;
