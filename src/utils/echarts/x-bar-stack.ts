/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { get } from "http";
import {
  getPriceSeries,
  getIndenpendYAxis,
  getToolTipFormater,
  commonOption,
  padArrayAhead,
  getXAxis
} from "./common";
import { formatNumber } from "@/utils/common";

export function xBarStackTransform({ indicatorDetailList, priceList, klineType }) {
  indicatorDetailList = padArrayAhead(indicatorDetailList, priceList.length);
  const options = {
    ...commonOption,

    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        const result = getToolTipFormater(params);
        return result;
      },
    },

    xAxis: getXAxis(priceList),
    yAxis: [],
    series: [],
  };
  if (priceList?.length) {
    options.yAxis.push({
      type: "value",
      name: "price",
      position: "right",
      splitLine: {
        show: false,
      },
    });
    const ser = getPriceSeries(priceList, klineType);
    options.series.push(ser);
  }

  if (indicatorDetailList?.length) {
    options.yAxis.push(getIndenpendYAxis());

    options.series.push({
      name: "Positive Value",
      data: indicatorDetailList.map((item) => item?.positive_value),
      type: "bar",
      stack: "x-bar-stack",
      itemStyle: {
        color: "rgba(30, 214, 255, 0.5)",
      },
      tooltip: {
        valueFormatter: (val) => formatNumber(val),
      },
      yAxisIndex: 1,
      // barWidth: 5
      barCategoryGap: "60%"

    });

    options.series.push({
      name: "Negative Value",
      data: indicatorDetailList.map((item) => item?.negative_value),
      type: "bar",
      stack: "x-bar-stack",
      itemStyle: {
        color: " rgba(255, 127, 80, 0.5)",
      },
      tooltip: {
        valueFormatter: (val) => formatNumber(val),
      },
      yAxisIndex: 1,
    });
  }

  return options;
}
