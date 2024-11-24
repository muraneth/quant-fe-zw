import { useCommonStore } from "@/store/common";
import styles from "./index.module.scss";

const Charts = () => {
  const setUserName = useCommonStore((store) => store.setUserName);
  return (
    <div
      className={styles.charts}
      onClick={() => setUserName("charts 页面注入的状态")}
    >
      charts
    </div>
  );
};

export default Charts;
