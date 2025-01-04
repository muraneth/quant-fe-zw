import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import React, { useEffect, useRef } from 'react';
interface SparklineChartProps {
  data: number[];
  color: string;
}
const SparklineChart: React.FC<SparklineChartProps> = ({ data, color }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ECharts | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current);
      }

      const option: EChartsOption = {
        animation: false,
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          // containLabel: true,
        },
        xAxis: {
          type: 'category',
          show: false,
          data: [0, 1, 2, 3, 4, 5, 6]
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          data: data,
          type: 'line',
          showSymbol: false,
          lineStyle: {
            width: 1,
            color: color
          },
          areaStyle: {
            color: color,
            opacity: 0.1
          }
        }]
      };

      chartInstance.current.setOption(option);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [data, color]);

  useEffect(() => {
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={chartRef} style={{ height: '40px', width: '100%' }} />;
};
export default SparklineChart;