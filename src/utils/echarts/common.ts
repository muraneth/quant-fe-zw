/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { formatNumber } from "../common";
import dayjs from 'dayjs';

export function parsePriceToKlineSeriesData(klineList) {
  return klineList.map((item) => [item.open, item.close, item.low, item.high]);
}

export const padArrayAhead = (arr, targetLen) => {
  const cloneArr = [...arr];
  while (cloneArr.length < targetLen) {
    cloneArr.unshift(null);
  }
  return cloneArr;
};

export const getPriceSeries = (klineList, klineType) => {
  if (klineList?.length) {
    switch (klineType) {
      case "kline":
        return {
          name: "kline",
          data: parsePriceToKlineSeriesData(klineList),
          type: "candlestick",
          itemStyle: {
            color0: "#ef232a",
            color: "#14b143",
            borderColor0: "#ef232a",
            borderColor: "#14b143",
          },
          yAxisIndex: 0,
        };

      case "avgPrice":
        return {
          name: "kline",
          data: klineList.map((item) => item?.avg_price),
          type: "line",
          smooth: true,
          yAxisIndex: 0,
        };
    }
  }
  return {};
};

export const getXAxis = (klineList) => {
  return {
    type: "category",
    data: klineList.map((item) => dayjs(item.time).format('YYYY-MM-DD')),
  };
}
export const getIndenpendYAxis = () => {
  return {
    type: "value",
    // name: "value",
    position:"left",
    axisLabel: {
      formatter: function (val) {
        return formatNumber(val); // Formatting Y-axis labels
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(200, 200, 200, 0.4)", // Very light gray with transparency
        width: 0.1, // Thinner line
        type: "solid", // or 'dashed', 'dotted'
      },
    },
  };
};

export const getToolTipFormater = (params) => {
  // refer to : https://echarts.apache.org/handbook/zh/how-to/interaction/drag/#%E6%B7%BB%E5%8A%A0-tooltip-%E7%BB%84%E4%BB%B6
  let result = `<strong>Date:</strong> ${params[0].axisValue}<br/>`;
  params.forEach((param) => {
    if (param.seriesType === "candlestick") {
      // Assuming param.value format is [open, close, low, high] for K-line
      const [key, open, close, low, high] = param.value;
      const percentageChange = (((close - open) / open) * 100).toFixed(2);
      result += `
              <div style="margin: 5px 0; line-height: 1.5;">
                <strong>${param.seriesName}:</strong> 
                <span style="color: #999;">Open:</span> ${formatNumber(open)} 
                <span style="color: #999;">Close:</span> ${formatNumber(close)} 
                <span style="color: #999;">Low:</span> ${formatNumber(low)} 
                <span style="color: #999;">High:</span> ${formatNumber(high)}
              </div>
              <div>
              <strong>Change:</strong> 
                <span style="color: ${
                  percentageChange >= 0 ? "green" : "red"
                };">${percentageChange}%</span>
              </div>
            `;
    } else {
      // For other series, just display series name and value
      result += `
              <div style="margin: 5px 0; line-height: 1.5;">
                <span style="display: inline-block; width: 10px; height: 10px; background-color: ${
                  param.color
                }; border-radius: 50%; margin-right: 5px;"></span>
                <strong>${param.seriesName}:</strong> ${formatNumber(
        param.value
      )}
              </div>
            `;
    }
  });
  return result;
};
export const commonOption = {
  dataZoom: [
    {
      type: "slider",
      xAxisIndex: 0,
      filterMode: "filter",
      backgroundColor: "#2d4137",
      borderColor: "transparent",
    },
    {
      type: "inside",
      xAxisIndex: 0,
      filterMode: "filter",
    },
  ],
  grid: {
    top: "10%",
    left: "2%",
    right: "2%",
    bottom: "12%",
    containLabel: true,
  },
  legend: {},
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
    },
  },
};
