/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { get } from "http";
import { getPriceSeries, commonOption, getToolTipFormater,getXAxis } from "./common";
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
      getXAxis(klineList),
    ],
    yAxis: [],
    series: [],
  };
  var klineMinPrice = 0
  var klineMaxPrice = 0
  if (klineList?.length) {
    klineMinPrice = klineList.reduce( (min, p) => (p.low < min ? p.low : min), klineList[0].low);
    klineMaxPrice = klineList.reduce( (max, p) => (p.high > max ? p.high : max), klineList[0].high);
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
    let newIndicatorData = [...indicatorData];

    if (options.yAxis.length > 0) {
      const step  = indicatorData[0].price_range_upper - indicatorData[0].price_range_lower
     
      const maxPrice = indicatorData.reduce(
        (max, p) => (p.price_range_upper > max ? p.price_range_upper : max),
        indicatorData[0].price_range_upper
      );
      const minPrice = indicatorData.reduce(
        (min, p) => (p.price_range_lower < min ? p.price_range_lower : min),
        indicatorData[0].price_range_lower
      );
      const toFixedStepsLower = Math.floor((minPrice-klineMinPrice) / step)
      const toFixedStepsUpper = Math.ceil((klineMaxPrice-maxPrice) / step)
      console.log("step",step);
      console.log("klineMinPrice",klineMinPrice, "klineMaxPrice",klineMaxPrice);
      console.log("minPrice",minPrice, "maxPrice",maxPrice);
      console.log("toFixedStepsLower",toFixedStepsLower);
      console.log("toFixedStepsUpper",toFixedStepsUpper);

      
      for (let i = 0; i < toFixedStepsLower; i++) {
        newIndicatorData.unshift({
          price_range_lower: minPrice - step*(i+1),
          price_range_upper: minPrice - step*(i),
          positive_value: 0,
          negative_value: 0,
        });
      }
      for (let i = 0; i < toFixedStepsUpper; i++) {
        newIndicatorData.push({
          price_range_lower: maxPrice + step*(i),
          price_range_upper: maxPrice + step*(i+1),
          positive_value: 0,
          negative_value: 0,
        });
      }

      options.yAxis[0].min = formatNumber(klineMinPrice); // set price range
      options.yAxis[0].max = formatNumber(klineMaxPrice);
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
      data: newIndicatorData.map((item) => item.price_range_lower),
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
