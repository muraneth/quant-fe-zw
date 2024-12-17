/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { get } from "http";
import { getPriceSeries, commonOption,getXAxis } from "./common";

export function yBarTransform({ indicatorData, klineList, klineType }) {
  const options = {
    ...commonOption,
    xAxis: [
      getXAxis(klineList),
    ],
    yAxis: [],
    series: [],
  };

  if (klineList?.length) {
    options.yAxis.push({
      type: "value",
      name: "price",
      splitLine: {
        show: false,
      },
      position: "right",
      nameLocation: "middle",
    });
    const ser = getPriceSeries(klineList, klineType);
    options.series.push(ser);
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
      position: "left",
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
