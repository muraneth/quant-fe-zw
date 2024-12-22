/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  getPriceSeries,
  getIndenpendYAxis,
  getToolTipFormater,
  commonOption,
  padArrayAhead,
  getXAxis,
} from "./common";

export function areaStackTransform({
  indicatorDetailList,
  priceList,
  klineType,
}) {
  const indicatorDetailList0 = padArrayAhead(
    indicatorDetailList[0],
    priceList.length
  );
  const indicatorDetailList1 = padArrayAhead(
    indicatorDetailList[1],
    priceList.length
  );

  const options = {
    ...commonOption,
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        const result = getToolTipFormater(params);
        return result;
      },
    },
    xAxis: [getXAxis(priceList)],
    yAxis: [],
    series: [],
  };

  if (priceList?.length) {
    options.yAxis.push({
      type: "value",
      name: "price($)",
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
      name: "indicator",
      data: indicatorDetailList0.map((item) => item?.value),
      type: "line",
      areaStyle: {
        color: "rgba(100, 23, 25, 0.2)",
      },
      smooth: true,
      symbol: "none",
      // stack:"value",
      yAxisIndex: 1,
    });
    options.series.push({
      name: "indicator",
      data: indicatorDetailList1.map((item) => item?.value),
      type: "line",
      areaStyle: {
        color: "rgba(0, 123, 255, 0.2)",
      },
      smooth: true,
      // stack:"value",
      symbol: "none",
      yAxisIndex: 1,
    });
  }

  return options;
}
