/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  getPriceSeries,
  commonOption,
  getToolTipFormater,
  padArrayAhead,
  getXAxis
} from "./common";

export function priceLineTransform({ indicatorDetailList, priceList, klineType }) {
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
    xAxis: [
      getXAxis(priceList)
    ],
    yAxis: [
      {
        type: "value",
        name: "price($)",
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(200, 200, 200, 0.6)", // Very light gray with transparency
            width: 0.3, // Thinner line
            type: "solid", // or 'dashed', 'dotted'
          },
        },
      },
    ],
    series: [],
  };

  if (priceList?.length) {
    const ser = getPriceSeries(priceList, klineType);
    options.series.push(ser);
  }

  if (indicatorDetailList?.length) {
    options.series.push({
      name: "Indicator",
      data: indicatorDetailList.map((item) => item?.value),
      type: "line",
      areaStyle: {
        color: "rgba(0, 123, 255, 0.2)", // Adjust the RGB and opacity as needed
      },
      smooth: true,
      symbol: "none",
    });
  }

  return options;
}
