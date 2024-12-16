/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Tooltip } from "antd";
import { getPriceSeries,getIndenpendYAxis, getToolTipFormater,commonOption,padArrayAhead,formatBigNumber } from "./common";

export function xBarStackTransform({ indicatorData, klineList, klineType }) {
  indicatorData = padArrayAhead(indicatorData, klineList.length);
  const options = {
    ...commonOption,
    
    tooltip:{
      trigger: "axis",
      formatter: function (params) {
        let result = getToolTipFormater(params);
        return result;
      }
    },

    xAxis: {
      type: "category",
      data: klineList.map((item) => item.time),
    },
    yAxis: [],
    series: [],
  };
  if (klineList?.length) {
    options.yAxis.push({
      type: "value",
      name: "price",
      splitLine: {
        show: false
      }
    })
    var  ser = getPriceSeries(klineList,klineType);
    options.series.push(ser);
  }

  if (indicatorData?.length) {
    options.yAxis.push(getIndenpendYAxis());

    const seriesLen = options.series.length;
    options.series.push({
      name: "positive_value",
      data: indicatorData.map((item) => item?.positive_value),
      type: "bar",
      stack: "x-bar-stack",
      itemStyle: {
        color: 'rgba(144, 238, 144, 0.5)'
      },
      tooltip: {
        valueFormatter: val =>formatBigNumber(val)
      },
      yAxisIndex:1
    });
    
    options.series.push({
      name: "negative_value",
      data: indicatorData.map((item) => item?.negative_value),
      type: "bar",
      stack: "x-bar-stack",
      itemStyle: {
        color: ' rgba(255, 111, 97, 0.5)'
      },
      tooltip: {
        valueFormatter: val =>formatBigNumber(val)
      },
      yAxisIndex : 1
    });
   
  }

  return options;
}
