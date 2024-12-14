import { Segmented } from "antd";
import { svgMap } from "@/constants/svg";
import { useChartStore } from "@/store/charts";
import styles from "./index.module.scss";

const SettingChart = () => {
  const klineType = useChartStore((state) => state.klineType);
  const setKlineType = useChartStore((state) => state.setKlineType);

  return (
    <>
      <div className={styles.topInfo}>
        <div className={styles.left}>
          <img
            className={styles.img}
            src="https://assets.coingecko.com/coins/images/18111/large/Doge.png?1696517615"
          />
          <span className={styles.title}>4CHAN</span>
          <span className={styles.desc}>FirstDayWalletBalance</span>
        </div>
        <Segmented
          options={[
            { value: "avgPrice", icon: svgMap["kine"] },
            { value: "kline", icon: svgMap["switch"] },
          ]}
          value={klineType}
          onChange={setKlineType}
        />
      </div>
      <div className={styles.setting}>
        {svgMap["settingIcon"]}
        <span className={styles.settingTitle}>Parameter Setting</span>
      </div>
    </>
  );
};

export default SettingChart;
