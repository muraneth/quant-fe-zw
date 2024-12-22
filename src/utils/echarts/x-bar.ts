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

export function xBarTransform({ indicatorData, klineList, klineType }) {
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
      name: "Indicator Value",
      data: indicatorData.map((item) => item?.value),
      type: "bar",
      yAxisIndex: 1,
      barCategoryGap: "60%",
      itemStyle: {
        color: (params) => {
          // params.value is the value of the bar
          return params.value < 0
            ? "rgba(255, 127, 80, 0.4)" // Red with 60% opacity for negative values
            : "rgba(30, 214, 255, 0.4)";
        },
      },
    });
  }

  return options;
}
