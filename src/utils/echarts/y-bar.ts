/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { parsePriceToKlineSeriesData, commonOption } from "./common";

export function yBarTransform({ indicatorData, klineList, klineType }) {
  const options = {
    ...commonOption,
    xAxis: [
      {
        type: "category",
        data: klineList.map((item) => item.time),
      },
    ],
    yAxis: [],
    series: [],
  };

  if (klineList?.length) {
    switch (klineType) {
      case "kline":
        options.yAxis.push({
          type: "value",
          name: "price",
        });
        options.series.push({
          name: "kline",
          data: parsePriceToKlineSeriesData(klineList),
          type: "candlestick",
        });
        options.series[options.series.length - 1].yAxisIndex =
          options.series.length - 1;
        break;
      case "avgPrice":
        options.yAxis.push({
          type: "value",
          name: "avg_price",
        });
        options.series.push({
          name: "kline",
          data: klineList.map((item) => item.avg_price),
          type: "line",
          smooth: true,
        });
        options.series[options.series.length - 1].yAxisIndex =
          options.series.length - 1;
        break;
    }
  }

  if (indicatorData?.length) {
    options.xAxis.push({
      type: "value",
      name: "Volume",
      nameLocation: "middle",
    });
    options.yAxis.push({
      type: "category",
      data: indicatorData.map((item) => item.price_range_lower),
      name: "Price Levels",
      nameLocation: "middle",
    });
    options.series.push({
      name: "Volume",
      type: "bar",
      data: indicatorData.map((item) => item.total_Value),
      barWidth: "40%",
    });
    options.series[options.series.length - 1].xAxisIndex =
      options.series.length - 1;
    options.series[options.series.length - 1].yAxisIndex =
      options.series.length - 1;
  }

  return options;
}
