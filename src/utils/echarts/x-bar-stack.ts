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

export function xBarStackTransform({ indicatorData, klineList, klineType }) {
  indicatorData = padArrayAhead(indicatorData, klineList.length);
  const options = {
    ...commonOption,

    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        const result = getToolTipFormater(params);
        return result;
      },
    },

    xAxis: getXAxis(klineList),
    yAxis: [],
    series: [],
  };
  if (klineList?.length) {
    options.yAxis.push({
      type: "value",
      name: "price",
      position: "right",
      splitLine: {
        show: false,
      },
    });
    const ser = getPriceSeries(klineList, klineType);
    options.series.push(ser);
  }

  if (indicatorData?.length) {
    options.yAxis.push(getIndenpendYAxis());

    options.series.push({
      name: "Positive Value",
      data: indicatorData.map((item) => item?.positive_value),
      type: "bar",
      stack: "x-bar-stack",
      itemStyle: {
        color: "rgba(144, 238, 144, 0.5)",
      },
      tooltip: {
        valueFormatter: (val) => formatNumber(val),
      },
      yAxisIndex: 1,
    });

    options.series.push({
      name: "Negative Value",
      data: indicatorData.map((item) => item?.negative_value),
      type: "bar",
      stack: "x-bar-stack",
      itemStyle: {
        color: " rgba(255, 111, 97, 0.5)",
      },
      tooltip: {
        valueFormatter: (val) => formatNumber(val),
      },
      yAxisIndex: 1,
    });
  }

  return options;
}
