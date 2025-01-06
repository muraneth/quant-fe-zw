/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { formatNumber } from "../common";
import dayjs from 'dayjs';

export function parsePriceToKlineSeriesData(priceList) {
  return priceList.map((item) => [item.open, item.close, item.low, item.high]);
}

export const padArrayAhead = (arr, targetLen) => {
  const cloneArr = [...arr];
  while (cloneArr.length < targetLen) {
    cloneArr.unshift(null);
  }
  return cloneArr;
};

export const getPriceSeries = (priceList, klineType) => {
  if (priceList?.length) {
    switch (klineType) {
      case "kline":
        return {
          name: "KLine",
          data: parsePriceToKlineSeriesData(priceList),
          type: "candlestick",
          itemStyle: {
            color0: "#F63C6B",
            color: "#0FEDBE",
            borderColor0: "#F63C6B",
            borderColor: "#0FEDBE",
          },
          yAxisIndex: 0,
          z: 0
        };

      case "avgPrice":
        return {
          name: "Avg Price",
          data: priceList.map((item) => item?.avg_price),
          type: "line",
          smooth: true,
          yAxisIndex: 0,
          symbol: "none",
          z: 0
        };
    }
  }
  return {};
};

export const getXAxis = (priceList) => {
  return {
    type: "category",
    data: priceList.map((item) => dayjs(item.time).format('YYYY-MM-DD')),
  };
}
export const getIndenpendYAxis = () => {
  return {
    type: "value",
    // name: "value",
    position: "left",
    axisLabel: {
      formatter: function (val) {
        return formatNumber(val); // Formatting Y-axis labels
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(200, 200, 200, 0.6)", // Very light gray with transparency
        width: 0.3, // Thinner line
        type: "solid", // or 'dashed', 'dotted'
      },
    },
  };
};

export const getToolTipFormater = (params) => {
  // refer to : https://echarts.apache.org/handbook/zh/how-to/interaction/drag/#%E6%B7%BB%E5%8A%A0-tooltip-%E7%BB%84%E4%BB%B6
  let result = `<strong>Date:</strong> ${params[0].axisValue}<br/>`;
  // console.log("params", params);

  params.forEach((param) => {
    if (param.seriesType === "candlestick") {
      // Assuming param.value format is [open, close, low, high] for K-line
      const [key, open, close, low, high] = param.value;
      const percentageChange = (((close - open) / open) * 100).toFixed(2);
      const amplitude = (((high - low) / low) * 100).toFixed(2);
      result += `
              <div style="margin: 5px 0; line-height: 1.5;">
                <strong>${param.seriesName}:</strong> 
                <span style="color: #999;">O:</span> ${formatNumber(open)} 
                <span style="color: #999;">C:</span> ${formatNumber(close)} 
                <span style="color: #999;">L:</span> ${formatNumber(low)} 
                <span style="color: #999;">H:</span> ${formatNumber(high)}
              </div>
              <div>
              <div>
              <strong>Change:</strong> 
              <span style="color: ${percentageChange >= 0 ? "green" : "red"};">${percentageChange}%</span>
              </div>
              <div>
              <strong>Amplitude:</strong>
              <span">${amplitude}%</span>
              </div>
              </div>
            `;
    } else {
      // For other series, just display series name and value
      if (param.axisType === "yAxis.category") {
        // for y-axis stacked bar chart
        result += `
                <div>
                  <strong>${param.seriesName}:</strong> ${formatNumber(param.value)}
                </div>
          `;
      } else if (param.axisType === "xAxis.value") {
        //skip

      }
      else {
        result += `
                <div >
                <strong>${param.seriesName}:</strong> ${formatNumber(param.value)}
                </div>
          `;
      }
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
  graphic: [
    {
      type: 'text',
      // left: 200, // pixels from left
      // top: 100,
      left: 'center',
      top: 'center',
      style: {
        text: 'tokenalytic.com',
        fontSize: 60,
        // fontWeight: 'bold',
        fill: 'rgba(100, 100, 0, 0.3)', // Semi-transparent watermark
        textAlign: 'center'
      }
    }
  ],
  legend: {
    // backgroundColor: '#ccc',
    textStyle: {
      color: '#ccc'
    }
  },

};

export const padPVBArray = (indicatorData, priceList) => {
  const klineMinPrice = priceList.reduce((min, p) => (p.low < min ? p.low : min), priceList[0].low);
  const klineMaxPrice = priceList.reduce((max, p) => (p.high > max ? p.high : max), priceList[0].high);
  let newIndicatorData = [...indicatorData];


  const step = indicatorData[0].price_range_upper - indicatorData[0].price_range_lower
  if (step === 0) {
    newIndicatorData = [] // 必须要清空，奇怪
    return { newIndicatorData, klineMinPrice, klineMaxPrice }
  }
  const maxPrice = indicatorData.reduce(
    (max, p) => (p.price_range_upper > max ? p.price_range_upper : max),
    indicatorData[0].price_range_upper
  );
  const minPrice = indicatorData.reduce(
    (min, p) => (p.price_range_lower < min ? p.price_range_lower : min),
    indicatorData[0].price_range_lower
  );
  const toFixedStepsLower = Math.floor((minPrice - klineMinPrice) / step)
  const toFixedStepsUpper = Math.ceil((klineMaxPrice - maxPrice) / step)
  console.log("step", step);
  console.log("klineMinPrice", klineMinPrice, "klineMaxPrice", klineMaxPrice);
  console.log("minPrice", minPrice, "maxPrice", maxPrice);
  console.log("toFixedStepsLower", toFixedStepsLower);
  console.log("toFixedStepsUpper", toFixedStepsUpper);


  for (let i = 0; i < toFixedStepsLower; i++) {
    newIndicatorData.unshift({
      price_range_lower: minPrice - step * (i + 1),
      price_range_upper: minPrice - step * (i),
      positive_value: 0,
      negative_value: 0,
    });
  }
  for (let i = 0; i < toFixedStepsUpper; i++) {
    newIndicatorData.push({
      price_range_lower: maxPrice + step * (i),
      price_range_upper: maxPrice + step * (i + 1),
      positive_value: 0,
      negative_value: 0,
    });
  }

  return { newIndicatorData, klineMinPrice, klineMaxPrice }
}