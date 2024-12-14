/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { parsePriceToKlineSeriesData, commonOption } from "./common";

export function xBarStackTransform({ indicatorData, klineList, klineType }) {
  const options = {
    ...commonOption,
    xAxis: {
      type: "category",
      data: indicatorData.map((item) => item.time),
    },
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
          type: "candlestick",
        });
        options.series[options.series.length - 1].yAxisIndex =
          options.series.length - 1;
        break;
    }
  }

  if (indicatorData?.length) {
    options.yAxis.push({
      type: "value",
      name: "value",
    });
    const seriesLen = options.series.length;
    options.series.push({
      name: "value",
      data: indicatorData.map((item) => item.value),
      type: "bar",
      smooth: true,
      stack: "x-bar-stack",
    });
    options.series[options.series.length - 1].yAxisIndex = seriesLen;

    options.series.push({
      name: "positive_value",
      data: indicatorData.map((item) => item.positive_value),
      type: "bar",
      stack: "x-bar-stack",
    });
    options.series[options.series.length - 1].yAxisIndex = seriesLen;

    options.series.push({
      name: "negative_value",
      data: indicatorData.map((item) => item.negative_value),
      type: "bar",
      stack: "x-bar-stack",
    });
    options.series[options.series.length - 1].yAxisIndex = seriesLen;
  }

  return options;
}
