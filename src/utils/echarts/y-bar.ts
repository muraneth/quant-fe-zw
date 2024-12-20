/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { get } from "http";
import { getPriceSeries, commonOption,getXAxis,padPVBArray } from "./common";
import { formatNumber } from "@/utils/common";

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
    const {newIndicatorData ,klineMinPrice,klineMaxPrice}= padPVBArray(indicatorData, klineList);
    options.yAxis[0].min = klineMinPrice; // set price range
    options.yAxis[0].max = klineMaxPrice;
    options.xAxis.push({
      type: "value",
      name: "Volume",
      nameLocation: "middle",
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(200, 200, 200, 0.4)", // Very light gray with transparency
          width: 0.5, // Thinner line
          type: "solid", // or 'dashed', 'dotted'
        },
      },
    });
    options.yAxis.push({
      type: "category",
      data: newIndicatorData.map((item) => item.price_range_lower),
      name: "Price Levels",
      nameLocation: "middle",
      position: "left",
      axisLabel: {
        formatter: function (val) {
          return formatNumber(val); // Formatting Y-axis labels
        },
      },
    });
    options.series.push({
      name: "Volume",
      type: "bar",
      data: newIndicatorData.map((item) => item.total_Value),
      barWidth: "40%",
    });
    options.series[options.series.length - 1].xAxisIndex =
      options.series.length - 1;
    options.series[options.series.length - 1].yAxisIndex =
      options.series.length - 1;
  }

  return options;
}
