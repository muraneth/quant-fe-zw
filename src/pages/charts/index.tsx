import Search from "./components/search";
import styles from "./index.module.scss";

const Charts = () => {
  return (
    <div className={styles.charts}>
      <div className={styles.top} />
      <div className={styles.content}>
        <Search />
      </div>
    </div>
  );
};

export default Charts;
