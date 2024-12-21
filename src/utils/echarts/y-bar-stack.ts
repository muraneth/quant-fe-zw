/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { get } from "http";
import { getPriceSeries, commonOption, getToolTipFormater,getXAxis } from "./common";
import { formatNumber } from "@/utils/common";

export function yBarStackTransform({ indicatorDetailList, priceList, klineType }) {
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
      getXAxis(priceList),
    ],
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
    if (options.yAxis.length > 0) {
      const maxPrice = indicatorDetailList.reduce(
        (max, p) => (p.price_range_upper > max ? p.price_range_upper : max),
        indicatorDetailList[0].price_range_upper
      );
      const minPrice = indicatorDetailList.reduce(
        (min, p) => (p.price_range_lower < min ? p.price_range_lower : min),
        indicatorDetailList[0].price_range_lower
      );
      options.yAxis[0].min = formatNumber(minPrice); // set price range
      options.yAxis[0].max = formatNumber(maxPrice);
    }
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
      data: indicatorDetailList.map((item) => item.price_range_lower),
      name: "Price Levels",
      nameLocation: "middle",
      position: "left",
      axisLabel: {
        formatter: function (val) {
          return formatNumber(val);
        },
      },
    });

    options.series.push({
      name: "positive_value",
      data: indicatorDetailList.map((item) => item.positive_value),
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
      data: indicatorDetailList.map((item) => item.negative_value),
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
