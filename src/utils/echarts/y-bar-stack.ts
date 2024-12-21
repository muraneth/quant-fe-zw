/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  getPriceSeries,
  commonOption,
  getToolTipFormater,
  getXAxis,
  padPVBArray,
} from "./common";
import { formatNumber } from "@/utils/common";

export function yBarStackTransform({
  indicatorDetailList,
  priceList,
  klineType,
}) {
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
      name: "price",
      nameLocation: "middle",
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(200, 200, 200, 0.4)", // Very light gray with transparency
          // or use '#eeeeee' for a light solid color
          width: 0.5, // Thinner line
          type: "solid", // or 'dashed', 'dotted'
        },
      },
      position: "right",
    });

    options.series.push(getPriceSeries(priceList, klineType));
  }

  if (indicatorDetailList?.length) {
    const { newIndicatorData, klineMinPrice, klineMaxPrice } =
      padPVBArray(indicatorDetailList, priceList);
    options.yAxis[0].min = formatNumber(klineMinPrice); // set price range
    options.yAxis[0].max = formatNumber(klineMaxPrice);

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
      axisLabel: {
        formatter: function (val) {
          return formatNumber(val);
        },
      },
    });
    options.yAxis.push({
      type: "category",
      data: newIndicatorData.map((item) => item.price_range_lower),
      name: "Price Levels",
      nameLocation: "middle",
      position: "left",
      // offset: -30,
      axisLabel: {
        formatter: function (val) {
          return formatNumber(val);
        },
      },
    });
    // options.grid ={
    //   ...options.grid,
    //   left: '10%',
    // }

    options.series.push({
      name: "positive_value",
      data: newIndicatorData.map((item) => item.positive_value),
      type: "bar",
      stack: "y-bar-stack",
      itemStyle: {
        color: "rgba(144, 238, 144, 0.5)",
      },
      yAxisIndex: 1,
      xAxisIndex: 1,
    });

    options.series.push({
      name: "negative_value",
      data: newIndicatorData.map((item) => item.negative_value),
      type: "bar",
      stack: "y-bar-stack",
      itemStyle: {
        color: "rgba(255, 111, 97, 0.5)",
      },
      yAxisIndex: 1,
      xAxisIndex: 1,
    });
  }

  return options;
}
