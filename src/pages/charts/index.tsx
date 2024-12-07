import Search from "./components/search";
import DataPanel from "./components/data-panel";
import styles from "./index.module.scss";

const Charts = () => {
  return (
    <div className={styles.charts}>
      <div className={styles.top} />
      <div className={styles.content}>
        <Search />
        <DataPanel />
      </div>
    </div>
  );
};

export default Charts;
