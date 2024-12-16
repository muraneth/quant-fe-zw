/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { parsePriceToKlineSeriesData, commonOption, padArrayAhead } from "./common";

export function independentLineTransform({
  indicatorData,
  klineList,
  klineType,
}) {
  indicatorData = padArrayAhead(indicatorData, klineList.length);
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
    options.yAxis.push({
      type: "value",
      name: "value",
    });
    options.series.push({
      name: "indicator",
      data: indicatorData.map((item) => item?.value),
      type: "line",
      areaStyle: {
        color: 'rgba(0, 123, 255, 0.2)'
      },
      smooth: true,
      symbol: 'none'
    });
    options.series[options.series.length - 1].yAxisIndex =
      options.series.length - 1;
  }

  return options;
}
