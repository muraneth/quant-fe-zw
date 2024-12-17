/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { getPriceSeries, commonOption, getToolTipFormater } from "./common";
import { formatNumber } from "@/utils/common";

export function yBarStackTransform({ indicatorData, klineList, klineType }) {
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

    options.series.push(getPriceSeries(klineList, klineType));
  }

  if (indicatorData?.length) {
    if (options.yAxis.length > 0) {
      const maxPrice = indicatorData.reduce(
        (max, p) => (p.price_range_upper > max ? p.price_range_upper : max),
        indicatorData[0].price_range_upper
      );
      const minPrice = indicatorData.reduce(
        (min, p) => (p.price_range_lower < min ? p.price_range_lower : min),
        indicatorData[0].price_range_lower
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
      data: indicatorData.map((item) => item.price_range_lower),
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
      data: indicatorData.map((item) => item.positive_value),
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
      data: indicatorData.map((item) => item.negative_value),
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
