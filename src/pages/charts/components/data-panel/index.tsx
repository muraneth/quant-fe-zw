import Markdown from "react-markdown";
import { useChartStore } from "@/store/charts";
import EchartsPanel from "./echarts-panel";
import MaskGuide from "./mask-guide";
import { svgMap } from "@/svg";
import styles from "./index.module.scss";

const DataPanel = () => {
  const tokenInfo = useChartStore((state) => state.tokenInfo) || {};
  const { required_level, handler_name } =
    useChartStore((state) => state.indicatorInfo) || {};
  return (
    <div className={styles.dataPanel}>
      {required_level >= 1 ? (
        <>
          <div className={styles.maskBackground}>{svgMap["maskBackground"]}</div>
          <MaskGuide />
        </>
      ) : null}

      {/* {tokenInfo.symbol}
      {tokenInfo.chain}
      {handler_name}
      {required_level} */}
      <EchartsPanel />
      <Markdown className={styles.markdown}>{"# Hi, *Pluto*!"}</Markdown>
    </div>
  );
};

export default DataPanel;
