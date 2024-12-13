import Markdown from "react-markdown";
import { useChartStore } from "@/store/charts";
import EchartsPanel from "./echarts-panel";
import MaskGuide from "./mask-guide";
import { svgMap } from "@/constants/svg";
import styles from "./index.module.scss";

const DataPanel = () => {
  const { required_level } =
    useChartStore((state) => state.indicatorInfo) || {};
  return (
    <div className={styles.dataPanel}>
      {required_level >= 1 ? (
        <>
          <div className={styles.maskBackground}>
            {svgMap["maskBackground"]}
          </div>
          <MaskGuide />
        </>
      ) : (
        <>
          <EchartsPanel />
          <Markdown className={styles.markdown}>
            {"# Hi, *Markdown area*!"}
          </Markdown>
        </>
      )}
    </div>
  );
};

export default DataPanel;
