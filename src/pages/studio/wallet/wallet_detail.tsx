import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useImmer } from "use-immer";
import { useRequest } from "ahooks";
import { getWalletInfo, WalletDailyInfo } from "@/service/wallets";
import { useChartStore } from "@/store/charts";

interface WalletDetailProps {
  wallet_address: string;
}

const WalletDetail: React.FC<WalletDetailProps> = ({ wallet_address }) => {
  const [walletDailyInfo, setWalletDailyInfo] = useImmer<WalletDailyInfo[]>([]);
  const tokenInfo = useChartStore.use.tokenInfo();

  const balanceChartRef = useRef<HTMLDivElement>(null);
  const pnlChartRef = useRef<HTMLDivElement>(null);
  const tokenMetricsChartRef = useRef<HTMLDivElement>(null);

  const { run: fetchWalletInfo } = useRequest(
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

  useEffect(() => {
    if (walletDailyInfo.length === 0) return;

    // Extract data for charts
    const days = walletDailyInfo.map((item) => item.day);
    const balances = walletDailyInfo.map((item) => item.balance);
    const idxPrices = walletDailyInfo.map((item) => item.idx_price);
    const realizedPnLs = walletDailyInfo.map((item) => item.realized_pnl);
    const unrealizedPnLs = walletDailyInfo.map((item) => item.unrealized_pnl);
    const avgCosts = walletDailyInfo.map((item) => item.avg_cost);

    // Initialize or update Balance Chart
    const balanceChart = echarts.init(balanceChartRef.current!);
    balanceChart.setOption({
      title: { text: "Wallet Balance and Index Price", left: "center" },
      tooltip: { trigger: "axis" },
      xAxis: { type: "category", data: days },
      yAxis: [
        { type: "value", name: "Balance", position: "left" },
        { type: "value", name: "Index Price", position: "right" },
      ],
      series: [
        {
          name: "Balance",
          type: "line",
          data: balances,
          smooth: true,
          yAxisIndex: 0, // Use the left y-axis
          lineStyle: { color: "#5470C6" },
        },
        {
          name: "Index Price",
          type: "line",
          data: idxPrices,
          smooth: true,
          yAxisIndex: 1, // Use the right y-axis
          lineStyle: { color: "#EE6666", type: "dashed" },
        },
      ],
    });

    // Initialize or update PnL Chart
    const pnlChart = echarts.init(pnlChartRef.current!);
    pnlChart.setOption({
      title: {
        text: "Realized, Unrealized PnL and Index Price",
        left: "center",
      },
      tooltip: { trigger: "axis" },
      xAxis: { type: "category", data: days },
      yAxis: [
        { type: "value", name: "PnL", position: "left" },
        { type: "value", name: "Index Price", position: "right" },
      ],
      series: [
        {
          name: "Realized PnL",
          type: "bar",
          data: realizedPnLs,
          yAxisIndex: 0, // Use the left y-axis
          itemStyle: { color: "#91CC75" },
        },
        {
          name: "Unrealized PnL",
          type: "line",
          data: unrealizedPnLs,
          smooth: true,
          yAxisIndex: 0, // Use the left y-axis
          lineStyle: { color: "#FAC858" },
        },
        {
          name: "Index Price",
          type: "line",
          data: idxPrices,
          smooth: true,
          yAxisIndex: 1, // Use the right y-axis
          lineStyle: { color: "#EE6666", type: "dashed" },
        },
      ],
    });

    // Initialize or update Token Metrics Chart
    const tokenMetricsChart = echarts.init(tokenMetricsChartRef.current!);
    tokenMetricsChart.setOption({
      title: { text: "Average Cost and Index Price", left: "center" },
      tooltip: { trigger: "axis" },
      xAxis: { type: "category", data: days },
      yAxis: [
        { type: "value", name: "Average Cost", position: "left" },
        { type: "value", name: "Index Price", position: "right" },
      ],
      series: [
        {
          name: "Average Cost",
          type: "line",
          data: avgCosts,
          smooth: true,
          yAxisIndex: 0, // Use the left y-axis
          lineStyle: { color: "#73C0DE" },
        },
        {
          name: "Index Price",
          type: "line",
          data: idxPrices,
          smooth: true,
          yAxisIndex: 1, // Use the right y-axis
          lineStyle: { color: "#EE6666", type: "dashed" },
        },
      ],
    });

    return () => {
      balanceChart.dispose();
      pnlChart.dispose();
      tokenMetricsChart.dispose();
    };
  }, [walletDailyInfo]);

  return (
    <div style={{ padding: "20px" }}>
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
  );
};

export default WalletDetail;
