/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { parsePriceToKlineSeriesData, commonOption } from "./common";

export function priceLineTransform({ indicatorData, klineList, klineType }) {
  const options = {
    ...commonOption,
    xAxis: [
      {
        type: "category",
        data: indicatorData.map((item) => item.time),
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "price",
      },
    ],
    series: [],
  };

  if (klineList?.length) {
    switch (klineType) {
      case "kline":
        options.series.push({
          name: "kline",
          data: parsePriceToKlineSeriesData(klineList),
          type: "candlestick",
        });
        break;
      case "avgPrice":
        options.series.push({
          name: "kline",
          data: klineList.map((item) => item.avg_price),
          type: "candlestick",
        });
        break;
    }
  }

  if (indicatorData?.length) {
    options.series.push({
      name: "indicator",
      data: indicatorData.map((item) => item.value),
      type: "line",
      smooth: true,
    });
  }

  return options;
}
