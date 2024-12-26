import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption, LineSeriesOption } from 'echarts';

const AreaChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [isReady, setIsReady] = useState(false);

  const data = [
    { date: '2024-01', value: 120 },
    { date: '2024-02', value: 200 },
    { date: '2024-03', value: -50 },
    { date: '2024-03', value: -60 },
    { date: '2024-03', value: 20 },
    { date: '2024-03', value: 40 }
  ];

  useEffect(() => {
    const initChart = () => {
      if (chartRef.current) {
        const { clientWidth, clientHeight } = chartRef.current;
        if (clientWidth > 0 && clientHeight > 0) {
          if (chartInstance.current) {
            chartInstance.current.dispose();
          }
          chartInstance.current = echarts.init(chartRef.current);
          setIsReady(true);
        }
      }
    };

    initChart();

    const resizeObserver = new ResizeObserver(() => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      } else {
        initChart();
      }
    });

    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!chartInstance.current || !isReady || !data) return;

    const series: LineSeriesOption[] = [
      {
        name: 'Value',
        type: 'line',
        data: data.map(item => item.value),
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(0, 0, 255, 0.3)'
            },
            {
              offset: 1,
              color: 'rgba(255, 0, 0, 0.3)'
            }
          ])
        },
        itemStyle: {
          color: (params: any) => {
            return data[params.dataIndex].value >= 0 ? 'blue' : 'red';
          }
        },
        lineStyle: {
          width: 1,
          color: (params: any) => {
            return data[params.dataIndex].value >= 0 ? 'blue' : 'red';
          }
        } as any // Type assertion needed for callback function
      }
    ];

    const option: EChartsOption = {
      xAxis: {
        type: 'category',
        data: data.map(item => item.date),
        boundaryGap: false
      },
      yAxis: {
        type: 'value'
      },
      series,
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const value = params[0].value;
          const color = value >= 0 ? 'blue' : 'red';
          return `${params[0].name}<br/>
                 <span style="color:${color}">${value}</span>`;
        }
      }
    };

    chartInstance.current.setOption(option);
  }, [data, isReady]);

  return (
    <div 
      ref={chartRef} 
      className="w-full h-64 md:h-96"
      style={{ minHeight: '16rem' }}
    />
  );
};

export default AreaChart;