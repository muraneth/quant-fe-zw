/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

/**
 * 根据 type 处理所有 options 生成的逻辑
 */
export function generateOptions(type, indicatorData) {
  const options = {
    xAxis: {
      type: "category",
      data: indicatorData.map((item) => item.time),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: indicatorData.map((item) => item.value),
        type: "line",
        smooth: true,
      },
    ],
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
  };

  return options;
}