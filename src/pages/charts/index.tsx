import * as React from "react";
import { Divider } from "antd";
import Header from "./components/header";
import Search from "./components/search";
import DataPanel from "./components/data-panel";
import { useChartStore } from "@/store/charts";
import styles from "./index.module.scss";
import { useLocation } from "react-router-dom";


const Charts = () => {
  const removeChartStore = useChartStore.use.removeChartStore();
  const setIndicatorInfo = useChartStore.use.setIndicatorInfo();
  const location = useLocation();

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const symbol = queryParams.get("symbol");
  const handleName = queryParams.get("handle_name");
  React.useEffect(() => {
    if (symbol && handleName) {
      setIndicatorInfo({
        handle_name: handleName,
        name:"",
        description:"",
        doc:"",
        required_level:0,
        // type:"",
        id:"",
        param_schema:"",
        category:""
      });
    }
   
  }, [symbol, handleName]);
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
