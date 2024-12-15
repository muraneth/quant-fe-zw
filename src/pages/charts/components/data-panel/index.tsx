import Markdown from "react-markdown";
import { useChartStore } from "@/store/charts";
import EchartsPanel from "./echarts-panel";
import MaskGuide from "./mask-guide";
import SettingChart from "./setting-chart";
import { svgMap } from "@/constants/svg";
import styles from "./index.module.scss";

const DataPanel = () => {
  const hasLevelAuth = useChartStore(state => state.hasLevelAuth);

  return (
    <div className={styles.dataPanel}>
      {!hasLevelAuth ? (
        <>
          <div className={styles.maskBackground}>
            {svgMap["maskBackground"]}
          </div>
          <MaskGuide />
          <>
          <div className={styles.echartsPanel}>
            <SettingChart />
            <EchartsPanel />
          </div>
          <Markdown className={styles.markdown}>
            {"# Hi, *Markdown area*!"}
          </Markdown>
        </>
        </>
      ) : (
        <>
          <div className={styles.echartsPanel}>
            <SettingChart />
            <EchartsPanel />
          </div>
          <Markdown className={styles.markdown}>
            {"# Hi, *Markdown area*!"}
          </Markdown>
        </>
      )}
    </div>
  );
};

export default DataPanel;
