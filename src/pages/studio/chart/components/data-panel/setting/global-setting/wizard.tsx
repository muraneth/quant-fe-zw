import React from "react";
import { useChartStore } from "@/store/charts";
import { svgMap } from "@/constants/svg";
import styles from "./index.module.scss";

const Wizard: React.FC = () => {
  const klineType = useChartStore.use.klineType();
  const setDraftData = useChartStore.use.setDraftData();

  const toggleKlineType = () => {
    setDraftData((draft) => {
      draft.klineType = klineType === "kline" ? "avgPrice" : "kline";
    });
  };

  return (
    <div onClick={toggleKlineType} className={styles.iconContainer}>
      {klineType === "kline" ? svgMap["switch"] : svgMap["kine"]}
    </div>
  );
};

export default Wizard;
