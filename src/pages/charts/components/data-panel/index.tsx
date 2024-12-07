import Markdown from "react-markdown";
import { useChartStore } from "@/store/charts";
import EchartsPanel from "./echarts-panel";
import MaskGuide from "./mask-guide";
import styles from "./index.module.scss";

const DataPanel = () => {
  const tokenInfo = useChartStore((state) => state.tokenInfo) || {};
  const { required_level, handler_name } =
    useChartStore((state) => state.indicatorInfo) || {};
  return (
    <div className={styles.dataPanel}>
      {required_level >= 1 ? <MaskGuide /> : null}

      {/* {tokenInfo.symbol}
      {tokenInfo.chain}
      {handler_name}
      {required_level} */}
      <EchartsPanel />

      {/* markdown */}
      <Markdown className={styles.markdown}>{"# Hi, *Pluto*!"}</Markdown>
    </div>
  );
};

export default DataPanel;
