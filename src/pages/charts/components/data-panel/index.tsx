import EchartsPanel from "./echarts-panel";
import MaskGuide from "./mask-guide";
import ChartInfo from "./chart-info";
import ChartSetting from "./setting";
import { svgMap } from "@/constants/svg";
import { getAuth } from '@/utils/common';
import styles from "./index.module.scss";

const DataPanel = () => {
  const { indicatorLevelAuth } = getAuth();

  return (
    <div className={styles.dataPanel}>
      {
        <>
          {!indicatorLevelAuth ? (
            <>
              <div className={styles.maskBackground}>
                {svgMap["maskBackground"]}
              </div>
              <MaskGuide />
            </>
          ) : null}
          <div className={styles.echartsPanel}>
            <ChartInfo />
            <ChartSetting />
            <EchartsPanel />
          </div>
        </>
      }
    </div>
  );
};

export default DataPanel;
