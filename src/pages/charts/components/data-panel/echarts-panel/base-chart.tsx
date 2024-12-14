/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import * as React from "react";
import * as echarts from "echarts";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useEventListener } from "ahooks";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

const BaseChart = ({ options }) => {
  const ref = React.useRef();
  const myChartRef = React.useRef();

  useEventListener("resize", () => {
    myChartRef.current?.resize();
  });

  React.useEffect(() => {
    window.addEventListener("menuChange", () => {
      myChartRef.current?.resize();
    });
  }, []);

  React.useEffect(() => {
    myChartRef.current = echarts.init(ref.current);
  }, []);

  React.useEffect(() => {
    if (!options) return;
    myChartRef.current.setOption(options);

    return () => {
      // 数据清理，确保数据不会相互影响
      myChartRef.current?.clear();
    };
  }, [options]);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
};

export default BaseChart;
