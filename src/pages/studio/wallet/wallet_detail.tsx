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

  useRequest(
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
    if (
      !walletDailyInfo.length ||
      !balanceChartRef.current ||
      !pnlChartRef.current ||
      !tokenMetricsChartRef.current
    )
      return;

    // Balance and USD Value Chart
    const balanceChart = echarts.init(balanceChartRef.current);
    const balanceOption: echarts.EChartsOption = {
      tooltip: {
        trigger: "axis",
        formatter: function (params: any) {
          const date = format(new Date(params[0].axisValue), "MMM dd, yyyy");
          let tooltipContent = `${date}<br/>`;
          params.forEach((param: any) => {
            const value = param.seriesName.includes("USD")
              ? `$${param.value.toLocaleString()}`
              : param.value.toLocaleString();
            tooltipContent += `${param.seriesName}: ${value}<br/>`;
          });
          return tooltipContent;
        },
      },
      legend: {
        data: ["Token Balance", "USD Value"],
      },
      xAxis: {
        type: "category",
        data: walletDailyInfo.map((item) => item.day),
        axisLabel: {
          formatter: (value: string) => format(new Date(value), "MMM dd"),
        },
      },
      yAxis: [
        {
          type: "value",
          name: "Token Balance",
          position: "left",
        },
        {
          type: "value",
          name: "USD Value",
          position: "right",
        },
      ],
      series: [
        {
          name: "Token Balance",
          type: "line",
          data: walletDailyInfo.map((item) => item.balance),
          smooth: true,
        },
        {
          name: "USD Value",
          type: "line",
          yAxisIndex: 1,
          data: walletDailyInfo.map((item) => item.balance_usd),
          smooth: true,
        },
      ],
    };
    balanceChart.setOption(balanceOption);

    // PNL Chart
    const pnlChart = echarts.init(pnlChartRef.current);
    const pnlOption: echarts.EChartsOption = {
      tooltip: {
        trigger: "axis",
        formatter: function (params: any) {
          const date = format(new Date(params[0].axisValue), "MMM dd, yyyy");
          let tooltipContent = `${date}<br/>`;
          params.forEach((param: any) => {
            tooltipContent += `${
              param.seriesName
            }: $${param.value.toLocaleString()}<br/>`;
          });
          return tooltipContent;
        },
      },
      legend: {
        data: ["Unrealized P/L", "Total P/L"],
      },
      xAxis: {
        type: "category",
        data: walletDailyInfo.map((item) => item.day),
        axisLabel: {
          formatter: (value: string) => format(new Date(value), "MMM dd"),
        },
      },
      yAxis: {
        type: "value",
        name: "USD",
      },
      series: [
        {
          name: "Unrealized P/L",
          type: "line",
          areaStyle: {},
          data: walletDailyInfo.map((item) => item.unrealized_pnl),
          smooth: true,
        },
        {
          name: "Total P/L",
          type: "line",
          areaStyle: {},
          data: walletDailyInfo.map((item) => item.total_pnl),
          smooth: true,
        },
      ],
    };
    pnlChart.setOption(pnlOption);

    // Token Metrics Chart
    const tokenMetricsChart = echarts.init(tokenMetricsChartRef.current);
    const tokenMetricsOption: echarts.EChartsOption = {
      tooltip: {
        trigger: "axis",
        formatter: function (params: any) {
          const date = format(new Date(params[0].axisValue), "MMM dd, yyyy");
          let tooltipContent = `${date}<br/>`;
          params.forEach((param: any) => {
            tooltipContent += `${
              param.seriesName
            }: ${param.value.toLocaleString()}<br/>`;
          });
          return tooltipContent;
        },
      },
      legend: {
        data: ["Average Token/Day", "Token Day Destroy"],
      },
      xAxis: {
        type: "category",
        data: walletDailyInfo.map((item) => item.day),
        axisLabel: {
          formatter: (value: string) => format(new Date(value), "MMM dd"),
        },
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Average Token/Day",
          type: "bar",
          data: walletDailyInfo.map((item) => item.avg_token_day),
        },
        {
          name: "Token Day Destroy",
          type: "line",
          data: walletDailyInfo.map((item) => item.token_day_destory),
        },
      ],
    };
    tokenMetricsChart.setOption(tokenMetricsOption);

    // Cleanup
    return () => {
      balanceChart.dispose();
      pnlChart.dispose();
      tokenMetricsChart.dispose();
    };
  }, [walletDailyInfo]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const charts = [
        echarts.getInstanceByDom(balanceChartRef.current),
        echarts.getInstanceByDom(pnlChartRef.current),
        echarts.getInstanceByDom(tokenMetricsChartRef.current),
      ];
      charts.forEach((chart) => chart?.resize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">
          Token Balance & USD Value
        </h2>
        <div ref={balanceChartRef} className="h-64 w-full" />
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Profit/Loss Analysis</h2>
        <div ref={pnlChartRef} className="h-64 w-full" />
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Token Metrics</h2>
        <div ref={tokenMetricsChartRef} className="h-64 w-full" />
      </div>
    </div>
  );
};

export default WalletDetail;
