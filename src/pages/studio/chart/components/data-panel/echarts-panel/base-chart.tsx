/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import * as React from "react";
import * as echarts from 'echarts';
import { useEventListener } from "ahooks";

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
    if (!options) {
      myChartRef.current.clear();
      return;
    };
    console.log("echartsOptions:", options);
    myChartRef.current.setOption(options);
  }, [options]);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
};

export default BaseChart;
