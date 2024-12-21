/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { get } from "http";
import { getPriceSeries, commonOption,getXAxis } from "./common";

export function yBarTransform({ indicatorDetailList, priceList, klineType }) {
  const options = {
    ...commonOption,
    xAxis: [
      getXAxis(priceList),
    ],
    yAxis: [],
    series: [],
  };

  if (priceList?.length) {
    options.yAxis.push({
      type: "value",
      name: "price",
      splitLine: {
        show: false,
      },
      position: "right",
      nameLocation: "middle",
    });
    const ser = getPriceSeries(priceList, klineType);
    options.series.push(ser);
  }

  if (indicatorDetailList?.length) {
    options.xAxis.push({
      type: "value",
      name: "Volume",
      nameLocation: "middle",
    });
    options.yAxis.push({
      type: "category",
      data: indicatorDetailList.map((item) => item.price_range_lower),
      name: "Price Levels",
      nameLocation: "middle",
      position: "left",
    });
    options.series.push({
      name: "Volume",
      type: "bar",
      data: indicatorDetailList.map((item) => item.total_Value),
      barWidth: "40%",
    });
    options.series[options.series.length - 1].xAxisIndex =
      options.series.length - 1;
    options.series[options.series.length - 1].yAxisIndex =
      options.series.length - 1;
  }

  return options;
}
