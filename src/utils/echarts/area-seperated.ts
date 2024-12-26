/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
    getPriceSeries,
    getIndenpendYAxis,
    getToolTipFormater,
    commonOption,
    padArrayAhead,
    getXAxis,
  } from "./common";
  
  export function areaSeperatedTransform({
    indicatorDetailList,
    priceList,
    klineType,
  }) {
    const positiveData = indicatorDetailList.map(item => (item.value >= 0 ? item.value : null));
    const negativeData = indicatorDetailList.map(item => (item.value < 0 ? item.value : null));
    // for (let i = 0; i < positiveData.length-1; i++) {
    //   if (positiveData[i] === null && positiveData[i+1] !== null) {
    //     positiveData[i] = 0;
    //   }
    //   else 
    //   if (positiveData[i] !== null && positiveData[i-1] === null) {
    //     positiveData[i] = 0;
    //   }
    // }
    // for (let i = 0; i < negativeData.length-1; i++) {
    //   if (negativeData[i] === null && negativeData[i+1] !== null) {
    //     negativeData[i] = 0;
    //   }
    //   else 
    //   if (negativeData[i] !== null && negativeData[i-1] === null) {
    //     negativeData[i] = 0;
    //   }
    // }
    
  
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
        name: "price($)",
        position: "right",
        splitLine: {
          show: false,
        },
      });
      const ser = getPriceSeries(priceList, klineType);
      options.series.push(ser);
    }
  
    if (indicatorDetailList?.length) {
      options.yAxis.push(getIndenpendYAxis());
      options.series.push({
        
        name: 'Positive Area',
        type: 'line',
        data: positiveData,
        smooth: true,
        lineStyle: {
            color: 'blue',
        },
        areaStyle: {
            color: 'rgba(0, 0, 205, 0.2)', // Light blue area
        },
        
        yAxisIndex: 1,
        symbol: "none",
      },{
        name: 'Negative Area',
        type: 'line',
        data: negativeData,
        smooth: true,
        lineStyle: {
            color: 'red',
        },
        areaStyle: {
            color: 'rgba(255, 0, 0, 0.2)', // Light red area
        },
        yAxisIndex: 1,
        symbol: "none",
      });
     
    }
  
    return options;
  }
  