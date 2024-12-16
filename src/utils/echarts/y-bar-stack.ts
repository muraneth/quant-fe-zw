/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { parsePriceToKlineSeriesData, commonOption } from "./common";

export function yBarStackTransform({ indicatorData, klineList, klineType }) {
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

    const seriesLen = options.series.length;
    options.series.push({
      name: "positive_value",
      data: indicatorData.map((item) => item.positive_value),
      type: "bar",
      stack: "y-bar-stack",
      itemStyle: {
        color: 'rgba(144, 238, 144, 0.5)'
      }
    });
    options.series[options.series.length - 1].xAxisIndex = seriesLen;
    options.series[options.series.length - 1].yAxisIndex = seriesLen;

    options.series.push({
      name: "negative_value",
      data: indicatorData.map((item) => item.negative_value),
      type: "bar",
      stack: "y-bar-stack",
      itemStyle: {
        color: ' rgba(255, 111, 97, 0.5)'
      }
    });
    options.series[options.series.length - 1].xAxisIndex = seriesLen;
    options.series[options.series.length - 1].yAxisIndex = seriesLen;
  }

  return options;
}
