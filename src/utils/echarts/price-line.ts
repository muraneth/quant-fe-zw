/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { parsePriceToKlineSeriesData, commonOption, padArrayAhead } from "./common";

export function priceLineTransform({ indicatorData, klineList, klineType }) {
  indicatorData = padArrayAhead(indicatorData, klineList.length);
  const options = {
    ...commonOption,
    xAxis: [
      {
        type: "category",
        data: klineList.map((item) => item.time),
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
          type: "line",
          smooth: true,
        });
        break;
    }
  }

  if (indicatorData?.length) {
    options.series.push({
      name: "indicator",
      data: indicatorData.map((item) => item?.value),
      type: "line",
      areaStyle: {
        color: 'rgba(0, 123, 255, 0.2)' // Adjust the RGB and opacity as needed
      },
      smooth: true,
      symbol: 'none'
    });
  }

  return options;
}
