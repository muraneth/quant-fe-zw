/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  getPriceSeries,
  getIndenpendYAxis,
  getToolTipFormater,
  commonOption,
  padArrayAhead,
} from "./common";

export function independentLineTransform({
  indicatorData,
  klineList,
  klineType,
}) {
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
    xAxis: [
      {
        type: "category",
        data: klineList.map((item) => item.time),
      },
    ],
    yAxis: [],
    series: [],
  };

  if (klineList?.length) {
    options.yAxis.push({
      type: "value",
      name: "price($)",
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
      type: "line",

      smooth: true,
      symbol: "none",
      yAxisIndex: 1,

      // areaStyle: {
      //   color: "rgba(0, 123, 255, 0.2)", // Static color for the area
      // }

    });
  }

  return options;
}
