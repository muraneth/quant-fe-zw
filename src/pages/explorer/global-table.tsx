import React, { useMemo, useEffect } from "react";
import { Table, Input } from "antd";
import { useRequest } from "ahooks";
import { useImmer } from "use-immer";
import { useNavigate } from "react-router-dom";
import { useExplorerStore } from "@/store/explorer";
import { formatNumber } from "@/utils/common";
import {
  getTokenSnap,
  getTokenByPage,
  getDefaultIndList,
  saveUserConfig,
} from "@/service/explorer";
import {
  TokenDetailInfo,
  TokenBaseInfo,
  IndicatorDetailReqDto,
  Indicator,
} from "@/service/charts";
import { getUserInfo } from "@/utils/common";

const PAGE_SIZE = 20;
const FETCH_DELAY = 50;

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
  const setDraftData = useExplorerStore.use.setDraftData();
  const navigate = useNavigate();

  const { runAsync: runGetTokenSnap } = useRequest(getTokenSnap, {
    manual: true,
  });
  const userInfo = getUserInfo();

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
    setSelectedRowKeys(userConfig.tokens);
  }, [userConfig]);

  useEffect(() => {
    const fetchTokenDetails = async () => {
      if (!indicatorList.length || !tokenList.length) return;

      setIsLoading(true);
      setTokenDetailList([]);

      const indReqTemp: IndicatorDetailReqDto[] = indicatorList.map((ind) => ({
        handle_name: ind.handle_name,
      }));

      for (const token of tokenList) {
        try {
          const result = await runGetTokenSnap({
            symbol: token.symbol,
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
      try {
        if (!userInfo || !userInfo.uid) {
          console.error("User config not loaded");
          //   setSelectedRowKeys(selectedRowKeys);
          return;
        }
        setSelectedRowKeys(newSelectedRowKeys as string[]);
        const response = await saveUserConfig({
          tokens: newSelectedRowKeys as string[],
          indicators: userConfig.indicators.map((ind) => ind.handle_name),
        });

        if (response) {
          setDraftData((draft) => {
            draft.userConfig.tokens = newSelectedRowKeys as string[];
          });
        } else {
          setSelectedRowKeys(selectedRowKeys);
        }
      } catch (error) {
        console.error("Selection save error:", error);
        setSelectedRowKeys(selectedRowKeys);
      }
    },
  };

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
                `/charts?symbol=${baseInfo.symbol}&handle_name=holder.all&chain=${baseInfo.chain}`
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
          return (snapA?.data[6]?.value || 0) - (snapB?.data[6]?.value || 0);

        },
        render: (_: any, record: TokenDetailInfo) => {
          const snap = record.indicator_snaps?.find(
            (snap) => snap.name === indicator.name
          );
          const baseInfo = record.base_info;


          return (snap&&snap.data&&snap.data.length>=7)?(

            <div
              style={{
                cursor: snap.handle_name ? "pointer" : "default",
                color: snap.handle_name ? "gray" : "inherit",
              }}
              onClick={() => {
                if (snap.handle_name) {
                  navigate(
                    `/charts?symbol=${baseInfo.symbol}&handle_name=${snap.handle_name}&chain=${baseInfo.chain}`
                  );
                }
              }}
            >
              <div>Cur Value: 
                <span>{formatNumber(snap.data[6].value)}</span>
              </div>
              {/* <span
                style={{ color: snap.value_chg_24h >= 0 ? "#36F097" : "#EB5757" }}
              >
                {formatNumber(snap.value_chg_24h * 100)}%
              </span> */}
            </div>
          ):null;
        },
      })) || [];

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
        rowKey={(record) => record.base_info.symbol}
        bordered
        //   loading={isLoading}
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
