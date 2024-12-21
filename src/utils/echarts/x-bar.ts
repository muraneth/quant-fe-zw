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
      position:"right",
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
      name: "indicator",
      data: indicatorDetailList.map((item) => item?.value),
      type: "bar",
      smooth: true,
      yAxisIndex: 1,
    });
  }

  return options;
}
