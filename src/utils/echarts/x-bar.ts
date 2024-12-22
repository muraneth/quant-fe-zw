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

export function xBarTransform({ indicatorDetailList, priceList, klineType }) {
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
      name: "Indicator Value",
      data: indicatorDetailList.map((item) => item?.value),
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
