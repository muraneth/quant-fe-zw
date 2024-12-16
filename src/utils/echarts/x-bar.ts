/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { getPriceSeries,getIndenpendYAxis,getToolTipFormater, commonOption, padArrayAhead } from "./common";


export function xBarTransform({ indicatorData, klineList, klineType }) {
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
    options.series.push({
      name: "indicator",
      data: indicatorData.map((item) => item?.value),
      type: "bar",
      smooth: true,
      yAxisIndex: 1,
    });
   
  }

  return options;
}
