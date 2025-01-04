import IndicatorSetting from "./indicator-setting";
import GlobalSetting from "./global-setting";
import styles from "./index.module.scss";

const ChartSetting = () => {
  return (
    <div className={styles.chartSetting}>
      <IndicatorSetting />
      <GlobalSetting />
    </div>
  );
};
export default ChartSetting;
