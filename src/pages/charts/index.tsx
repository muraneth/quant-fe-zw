import Header from "./components/header";
import Search from "./components/search";
import DataPanel from "./components/data-panel";
import styles from "./index.module.scss";
import { Divider } from 'antd';

const Charts = () => {
  return (
    <div className={styles.charts}>
      <div className={styles.top}>
        <Header />
        <Divider style={{ margin: 0}}/>
      </div>
      <div className={styles.content}>
        <Search />
        <Divider type="vertical" style={{height:'100vh', margin: 0}} />
        <DataPanel />
      </div>
    </div>
  );
};

export default Charts;
