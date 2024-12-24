import * as React from "react";
import { Divider } from "antd";
import Header from "./components/header";
import Search from "./components/search";
import DataPanel from "./components/data-panel";
import { useChartStore } from "@/store/charts";
import styles from "./index.module.scss";
import { useLocation } from "react-router-dom";


const Charts = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const symbol = queryParams.get("symbol");
  const handle_name = queryParams.get("handle_name");
  const type = queryParams.get("type") as any;

  const removeChartStore = useChartStore.use.removeChartStore();
  const setDraftData = useChartStore.use.setDraftData();

  
  React.useEffect(() => {
    if (symbol && handle_name && type) {
      // url参数解析设置
      setDraftData(draft => {
        draft.tokenInfo.symbol = symbol;
        draft.indicatorInfo.handle_name = handle_name;
        draft.indicatorInfo.type = type;
      })
    }
   
  }, [symbol, handle_name, type, setDraftData]);

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
