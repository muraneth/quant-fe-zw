/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

export function parsePriceToKlineSeriesData(klineList) {
  return klineList.map((item) => [item.open, item.close, item.low, item.high]);
}

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
  legend: {},
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: 'cross'
    },
  },
};
