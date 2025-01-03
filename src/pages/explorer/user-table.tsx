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
import { formatNumber } from "@/utils/common";
import { useNavigate } from "react-router-dom";
import { useEffect,useRef } from "react";
import type { TablePaginationConfig } from "antd/es/table";
import { useExplorerStore } from "@/store/explorer";
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';

interface SparklineChartProps {
  data: number[];
  color: string;
}
const SparklineChart: React.FC<SparklineChartProps> = ({ data, color }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ECharts | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current);
      }

      const option: EChartsOption = {
        animation: false,
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          // containLabel: true,
        },
        xAxis: {
          type: 'category',
          show: false,
          data: [0, 1, 2, 3, 4, 5, 6]
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          data: data,
          type: 'line',
          showSymbol: false,
          lineStyle: {
            width: 1,
            color: color
          },
          areaStyle: {
            color: color,
            opacity: 0.1
          }
        }]
      };

      chartInstance.current.setOption(option);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [data, color]);

  useEffect(() => {
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={chartRef} style={{ height: '40px', width: '100%' }} />;
};
const UserTokenTable = () => {
  const [tokenDetailList, setTokenDetailList] = useImmer<
    Array<TokenDetailInfo>
  >([]);
  const [currentPage, setCurrentPage] = useImmer(1);
  // const [userConfig, setUserConfig] = useImmer<UserConfig>({} as UserConfig);
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
    // Update both states
    setTokenDetailList((prev) =>
      prev.filter((item) => item.base_info.symbol !== symbol)
    );
    
    // Create the new token list
    const newTokenList = existingToken.filter(item => item !== symbol);
    
    // Update state
    setExistingToken(newTokenList);
    
    // Save using the new list directly
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
    
    // Create indicator request array
    const indReqTemp = userConfig.indicators.map(ind => ({
      handle_name: ind.handle_name,
    }));
  
    setExistingToken(userConfig.tokens);
  
    // Process all tokens when indicators change, or only new tokens otherwise
    const processTokens = async () => {
      // Check if indicators have changed by comparing with first token's indicators
      const hasIndicatorsChanged = tokenDetailList.length > 0 && 
        tokenDetailList[0].indicator_snaps.length !== userConfig.indicators.length;
  
      // If indicators changed, clear the list and process all tokens
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
        // Just process new tokens
        const existingTokens = new Set(
          tokenDetailList.map(item => item.base_info.symbol)
        );
  
        // Clean up removed tokens
        setTokenDetailList(prev => 
          prev.filter(item => userConfig.tokens.includes(item.base_info.symbol))
        );
  
        // Process only new tokens
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

  const columns = useMemo(() => {
    // Base columns for token info

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
                `/charts?symbol=${baseInfo.symbol}&handle_name=holder.all&chain=${baseInfo.chain}`
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
    const dynamicColumns =
      tokenDetailList[0]?.indicator_snaps?.map((indicator, index) => ({
        title: indicator.name,
        key: `indicator_${index}`,
        width: "180px",
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
          if (snap?.data && snap.data.length >= 7) {
            const values = snap.data.map(d => d.value);
            const getColor = (current:number, previous:number) => (current - previous >= 0 ? "#36F097" : "#EB5757");
            const calculateChange = (current:number, previous:number) => 
                ((current - previous) / previous * 100).toFixed(2);
        
            return (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        gap: "4px",
                        padding: "4px",
                        fontSize: "12px",
                        lineHeight: "1.5",
                    }}
                >
                    <div>
                        <strong>Current:</strong>{" "}
                        <span style={{ fontWeight: "bold" }}>{formatNumber(snap.data[6].value)}</span>
                    </div>
                    <div>
                        <strong>24h:</strong>{" "}
                        <span>{formatNumber(snap.data[5].value)} / </span>
                        <span style={{ color: getColor(snap.data[6].value, snap.data[5].value) }}>
                            {calculateChange(snap.data[6].value, snap.data[5].value)}%
                        </span>
                    </div>
                    <div>
                        <strong>7d:</strong>{" "}
                        <span>{formatNumber(snap.data[0].value)} / </span>
                        <span style={{ color: getColor(snap.data[6].value, snap.data[0].value) }}>
                            {calculateChange(snap.data[6].value, snap.data[0].value)}%
                        </span>
                    </div>
                    <div style={{ width: "100%", marginTop: "4px" }}>
                        <SparklineChart 
                            data={values} 
                            color={getColor(snap.data[6].value, snap.data[0].value)} 
                        />
                    </div>
                </div>
            );
        }
           
        },
      })) || [];
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
