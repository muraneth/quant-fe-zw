import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useImmer } from "use-immer";
import { useRequest } from "ahooks";
import { getWalletInfo, WalletDailyInfo } from "@/service/wallets";
import { getBasePrice, BasePriceItem } from "@/service/charts";
import { useChartStore } from "@/store/charts";
import { Spin, Segmented } from "antd";
import { padArrayAhead } from "@/utils/echarts/common";
import { getUserInfo } from "@/utils/common";
import { getYearAgoTime, get3MonthAgoTime } from "@/utils/time";
import MaskGuide from "./mask-guide";
import dayjs from "dayjs";
interface WalletDetailProps {
  wallet_address: string;
}

const TOP_OPTIONS = [
  { label: "3M", value: "3M", requiredLevel: 0, disabled: false }, // Free tier
  { label: "1Y", value: "1Y", requiredLevel: 1, disabled: true }, // Paid tier
  { label: "ALL", value: "ALL", requiredLevel: 2, disabled: true }, // Premium tier
];

// Get the available options based on the user level
const getOptions = (userLevel: number) => {
  if (!userLevel) {
    return TOP_OPTIONS;
  }
  for (const option of TOP_OPTIONS) {
    if (userLevel >= option.requiredLevel) {
      option.disabled = false;
    } else {
      option.disabled = true;
    }
  }
  return TOP_OPTIONS;
};

const WalletDetail: React.FC<WalletDetailProps> = ({ wallet_address }) => {
  const [walletDailyInfo, setWalletDailyInfo] = useImmer<WalletDailyInfo[]>([]);
  const tokenInfo = useChartStore.use.tokenInfo();

  const chartRefs = useRef<(HTMLDivElement | null)[]>([]);
  const charts: echarts.ECharts[] = [];
  const [priceList, setPriceList] = useImmer<BasePriceItem[]>([]);
  const userInfo = getUserInfo();
  const [selectedSegment, setSelectedSegment] = useImmer<string>("3M");

  const options = getOptions(userInfo.level);

  const getStartTime = () => {
    switch (selectedSegment) {
      case "3M":
        return get3MonthAgoTime();
      case "1Y":
        return getYearAgoTime();
      case "ALL":
        return tokenInfo.create_time;
      default:
        return get3MonthAgoTime(); // Default to 3 months if something goes wrong
    }
  };
  const checkIfUserPaid = () => {
    return userInfo.level > 0;
  };
  useRequest(
    () => {
      if (!tokenInfo || !tokenInfo.symbol || !tokenInfo.chain) {
        return Promise.resolve([]);
      }
      return getBasePrice({
        symbol: tokenInfo.symbol,
        chain: tokenInfo.chain,
        start_time: getStartTime(),
        end_time: "",
      });
    },
    {
      refreshDeps: [tokenInfo, selectedSegment],
      onSuccess: (data) => {
        setPriceList(data);
      },
    }
  );
  const { loading: fetchWalletInfoLoading } = useRequest(
    () => {
      if (!tokenInfo || !tokenInfo.symbol || !tokenInfo.chain) {
        return Promise.resolve([]);
      }
      return getWalletInfo({
        symbol: tokenInfo.symbol,
        chain: tokenInfo.chain,
        start_time: getStartTime(),
        wallet_address,
      });
    },
    {
      refreshDeps: [tokenInfo, selectedSegment],
      onSuccess: (data: WalletDailyInfo[]) => {
        setWalletDailyInfo(() => data);
      },
    }
  );
  const renderChart = (
    ref: React.RefObject<HTMLDivElement>,
    title: string,
    seriesData: { name: string; data: number[]; yAxisIndex: number }[],
    xData: string[],
    type: string
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
            lineStyle: { color: "rgba(200, 200, 200, 0.4)", width: 0.3 },
          },
        },
        {
          type: "value",
          name: "Index Price",
          position: "right",
          splitLine: { show: false },
        },
      ],
      series: seriesData.map((item) => ({
        name: item.name,
        type: item.name === "Index Price" ? "line" : type,
        data: item.data,
        smooth: true,
        symbol: "none",
        yAxisIndex: item.yAxisIndex,
        lineStyle:
          item.name === "Index Price"
            ? { color: "rgba(144, 238, 144, 0.3)" }
            : {},
        itemStyle:
          type === "bar"
            ? {
                color: (params: any) =>
                  params.value < 0
                    ? "rgba(255, 127, 80, 0.8)"
                    : "rgba(30, 214, 255, 0.8)",
              }
            : {
                color: "rgba(30, 214, 255, 0.8)",
              },
      })),
      dataZoom: [
        {
          type: "slider",
          xAxisIndex: 0,
          start: 0,
          end: 100,
        },
        {
          type: "inside",
          xAxisIndex: 0,
          start: 0,
          end: 100,
        },
      ],
    });

    return chart;
  };

  useEffect(() => {
    if (
      !walletDailyInfo ||
      walletDailyInfo.length === 0 ||
      !priceList ||
      priceList.length === 0
    )
      return;

    const idxPrices = priceList.map((item) => item?.avg_price);
    const days = priceList.map((item) => dayjs(item.time).format("YYYY-MM-DD"));
    const priceLength = priceList?.length;
    const newWalletInfo = padArrayAhead(walletDailyInfo, priceLength);

    const balances = newWalletInfo.map((item) => item?.balance);
    const unrealizedPnLs = newWalletInfo.map((item) => item?.unrealized_pnl);
    const avgCosts = newWalletInfo.map((item) => item?.avg_cost);

    // Render all charts
    const renderedCharts = [
      renderChart(
        { current: chartRefs.current[0] },
        "Wallet Balance",
        [
          { name: "Balance", data: balances, yAxisIndex: 0 },
          { name: "Index Price", data: idxPrices, yAxisIndex: 1 },
        ],
        days,
        "line"
      ),
      renderChart(
        { current: chartRefs.current[1] },
        "Balance Change",
        [
          {
            name: "Balance Change",
            data: newWalletInfo.map((item) => item?.balance_chg),
            yAxisIndex: 0,
          },
          { name: "Index Price", data: idxPrices, yAxisIndex: 1 },
        ],
        days,
        "bar"
      ),
      renderChart(
        { current: chartRefs.current[2] },
        "Average Cost",
        [
          { name: "Average Cost", data: avgCosts, yAxisIndex: 0 },
          { name: "Index Price", data: idxPrices, yAxisIndex: 0 },
        ],
        days,
        "line"
      ),
      renderChart(
        { current: chartRefs.current[3] },
        "Unrealized PnL",
        [
          { name: "Unrealized PnL", data: unrealizedPnLs, yAxisIndex: 0 },
          { name: "Index Price", data: idxPrices, yAxisIndex: 1 },
        ],
        days,
        "line"
      ),
      renderChart(
        { current: chartRefs.current[4] },
        "Realized PnL",
        [
          {
            name: "Realized PnL",
            data: newWalletInfo.map((item) => item?.realized_pnl),
            yAxisIndex: 0,
          },
          { name: "Index Price", data: idxPrices, yAxisIndex: 1 },
        ],
        days,
        "bar"
      ),
      renderChart(
        { current: chartRefs.current[5] },
        "Total PnL",
        [
          {
            name: "Total PnL",
            data: newWalletInfo.map((item) => item?.total_pnl),
            yAxisIndex: 0,
          },
          { name: "Index Price", data: idxPrices, yAxisIndex: 1 },
        ],
        days,
        "line"
      ),

      renderChart(
        { current: chartRefs.current[6] },
        "Avg Token Day",
        [
          {
            name: "Avg Token Day",
            data: newWalletInfo.map((item) => item?.avg_token_day),
            yAxisIndex: 0,
          },
          { name: "Index Price", data: idxPrices, yAxisIndex: 1 },
        ],
        days,
        "line"
      ),
      renderChart(
        { current: chartRefs.current[7] },
        "Token Day Destroyed",
        [
          {
            name: "Token Day Destroyed",
            data: newWalletInfo.map((item) => item?.token_day_destory),
            yAxisIndex: 0,
          },
          { name: "Index Price", data: idxPrices, yAxisIndex: 1 },
        ],
        days,
        "bar"
      ),
    ];

    // Save references to charts and connect them
    renderedCharts.forEach((chart, index) => {
      if (chart) charts[index] = chart;
    });
    echarts.connect(charts);

    return () => {
      renderedCharts.forEach((chart) => chart && chart.dispose());
    };
  }, [walletDailyInfo, priceList]);

  return (
    <Spin spinning={fetchWalletInfoLoading}>
      <div
        style={{
          padding: "20px",
          minHeight: "100vh",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Segmented
            options={options}
            value={selectedSegment}
            onChange={(value) => setSelectedSegment(value)}
          />
        </div>
        {!walletDailyInfo || walletDailyInfo.length === 0 ? (
          <div style={{ textAlign: "center", fontSize: "18px", color: "#888" }}>
            No data for this wallet with token {tokenInfo.symbol}
          </div>
        ) : (
          [0, 1, 2, 3, 4, 5, 6, 7].map((_, index) => {
            const shouldShowMask =
              !checkIfUserPaid() && index >= 2 && index <= 7;

            return (
              <div
                key={index}
                style={{
                  marginBottom: "20px",
                  position: "relative", // Add this to make absolute positioning work
                }}
              >
                <div
                  ref={(el) => (chartRefs.current[index] = el)}
                  style={{
                    width: "100%",
                    height: "300px",
                  }}
                />
                {shouldShowMask ? (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MaskGuide type="chart" />
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </Spin>
  );
};

export default WalletDetail;
