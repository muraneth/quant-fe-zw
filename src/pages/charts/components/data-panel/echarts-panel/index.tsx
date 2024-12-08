import { Segmented } from "antd";
import { svgMap } from "@/constants/svg";
import MiddleChart from "./middle-chart";
import styles from "../index.module.scss";

const EchartsPanel = () => {
  return (
    <div className={styles.echartsPanel}>
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
            { value: "List", icon: svgMap["kine"] },
            { value: "Kanban", icon: svgMap["switch"] },
          ]}
        />
      </div>
      <div className={styles.echartsWrapper}>
        <MiddleChart />
      </div>
    </div>
  );
};

export default EchartsPanel;
