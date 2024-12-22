import * as React from "react";
import { Divider } from "antd";
import Header from "./components/header";
import Search from "./components/search";
import DataPanel from "./components/data-panel";
import { useChartStore } from "@/store/charts";
import styles from "./index.module.scss";

const Charts = () => {
  const removeChartStore = useChartStore.use.removeChartStore();

  React.useEffect(() => {
    return () => {
      removeChartStore();
    };
  }, [removeChartStore]);

  return (
    <div className={styles.charts}>
      <div className={styles.top}>
        <Header />
        <Divider style={{ margin: 0 }} />
      </div>
      <div className={styles.content}>
        <Search />
        <Divider type="vertical" style={{ height: "100vh", margin: 0 }} />
        <DataPanel />
      </div>
    </div>
  );
};

export default Charts;
