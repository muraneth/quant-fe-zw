import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useImmer } from "use-immer";
import { useRequest } from "ahooks";
import { getWalletInfo, WalletDailyInfo } from "@/service/wallets";
import { useChartStore } from "@/store/charts";
import { Spin } from "antd";

interface WalletDetailProps {
  wallet_address: string;
}

const WalletDetail: React.FC<WalletDetailProps> = ({ wallet_address }) => {
  const [walletDailyInfo, setWalletDailyInfo] = useImmer<WalletDailyInfo[]>([]);
  const tokenInfo = useChartStore.use.tokenInfo();

  const balanceChartRef = useRef<HTMLDivElement>(null);
  const pnlChartRef = useRef<HTMLDivElement>(null);
  const tokenMetricsChartRef = useRef<HTMLDivElement>(null);

  const { run: fetchWalletInfo, loading: fetchWalletInfoLoading } = useRequest(
    () =>
      getWalletInfo({
        symbol: tokenInfo.symbol,
        chain: tokenInfo.chain,
        wallet_address,
      }),
    {
      refreshDeps: [tokenInfo],
      onSuccess: (data: WalletDailyInfo[]) => {
        setWalletDailyInfo(() => data);
      },
    }
  );

  const renderChart = (
    ref: React.RefObject<HTMLDivElement>,
    title: string,
    seriesData: { name: string; data: number[]; yAxisIndex: number }[],
    xData: string[]
  ) => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    chart.setOption({
      title: { text: title, left: "center" },
      tooltip: { trigger: "axis" },
      xAxis: { type: "category", data: xData },
      yAxis: [
        {
          type: "value",
          name: seriesData[0].name,
          position: "left",
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(200, 200, 200, 0.4)", // Very light gray with transparency
              width: 0.3, // Thinner line
              type: "solid", // or 'dashed', 'dotted'
            },
          },
        },
        {
          type: "value",
          name: "Index Price",
          position: "right",
          splitLine: {
            show: false,
          },
        },
      ],
      series: seriesData.map((item) => ({
        name: item.name,
        type: "line",
        data: item.data,
        smooth: true,
        yAxisIndex: item.yAxisIndex,
        lineStyle:
          item.name === "Index Price"
            ? { color: "rgba(144, 238, 144, 0.3)" }
            : {}, // Set opacity for the price line
      })),
    });
    return () => chart.dispose();
  };

  useEffect(() => {
    if (!walletDailyInfo || walletDailyInfo.length === 0) return;

    const days = walletDailyInfo.map((item) => item.day);
    const balances = walletDailyInfo.map((item) => item.balance);
    const idxPrices = walletDailyInfo.map((item) => item.idx_price);
    const unrealizedPnLs = walletDailyInfo.map((item) => item.unrealized_pnl);
    const avgCosts = walletDailyInfo.map((item) => item.avg_cost);

    const cleanupFns = [
      renderChart(
        balanceChartRef,
        "Wallet Balance",
        [
          { name: "Balance", data: balances, yAxisIndex: 0 },
          { name: "Index Price", data: idxPrices, yAxisIndex: 1 },
        ],
        days
      ),
      renderChart(
        pnlChartRef,
        "Unrealized PnL",
        [
          { name: "Unrealized PnL", data: unrealizedPnLs, yAxisIndex: 0 },
          { name: "Index Price", data: idxPrices, yAxisIndex: 1 },
        ],
        days
      ),
      renderChart(
        tokenMetricsChartRef,
        "Average Cost",
        [
          { name: "Average Cost", data: avgCosts, yAxisIndex: 0 },
          { name: "Index Price", data: idxPrices, yAxisIndex: 1 },
        ],
        days
      ),
    ];

    return () => cleanupFns.forEach((cleanup) => cleanup && cleanup());
  }, [walletDailyInfo]);

  return (
    <Spin spinning={fetchWalletInfoLoading}>
      <div
        style={{
          padding: "20px",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!walletDailyInfo || walletDailyInfo.length === 0 ? (
          <div style={{ textAlign: "center", fontSize: "18px", color: "#888" }}>
            No data for this wallet
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            <div
              ref={balanceChartRef}
              style={{ width: "100%", height: "400px", marginBottom: "20px" }}
            ></div>
            <div
              ref={pnlChartRef}
              style={{ width: "100%", height: "400px", marginBottom: "20px" }}
            ></div>
            <div
              ref={tokenMetricsChartRef}
              style={{ width: "100%", height: "400px" }}
            ></div>
          </div>
        )}
      </div>
    </Spin>
  );
};

export default WalletDetail;
