import EchartsPanel from "./echarts-panel";
import MaskGuide from "./mask-guide";
import ChartInfo from "./chart-info";
import ChartSetting from "./setting";
import { svgMap } from "@/constants/svg";
import { getUserInfo } from '@/utils/common';
import { useChartStore } from "@/store/charts";
import styles from "./index.module.scss";

const DataPanel = () => {
  // const { indicatorLevelAuth } = getAuth();
  const userInfo = getUserInfo();
  const indicatorInfo = useChartStore.use.indicatorInfo();
  const chartArea = (
    <div >
      <ChartSetting />
      <EchartsPanel />
    </div>
  )
  const maskGuide = (
      <>
        <div className={styles.maskBackground}>
          {svgMap["maskBackground"]}
        </div>
        <MaskGuide />
      </>
  )
  return (
    <div className={styles.dataPanel}>
      <div className={styles.echartsPanel}>
        <ChartInfo />
        {indicatorInfo.required_level <= 1 
          ? chartArea 
          : (!userInfo.level || userInfo.level < indicatorInfo.required_level)
            ? maskGuide 
            : chartArea
        }
      </div>
    </div>
  );
};

export default DataPanel;
