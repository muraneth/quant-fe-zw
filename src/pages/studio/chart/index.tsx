import * as React from "react";
import { Divider } from "antd";
import Search from "./components/search";
import DataPanel from "./components/data-panel";
import { useChartStore } from "@/store/charts";
import {IndicatorListResDto,Indicator} from "@/service/charts"
import styles from "./index.module.scss";
import { useLocation } from "react-router-dom";

const Charts = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const chain = queryParams.get("chain") as string;
  const symbol = queryParams.get("symbol");
  const handle_name = queryParams.get("handle_name");
  const removeChartStore = useChartStore.use.removeChartStore();
  const setDraftData = useChartStore.use.setDraftData();
  const indicatorList = useChartStore.use.indicatorList();

  React.useEffect(() => {
    if (symbol && handle_name &&indicatorList ) {
      // url参数解析设置
      setDraftData((draft) => {
        // draft.tokenInfo.symbol = symbol;
        draft.tokenInfo = {
          symbol: symbol,
          chain: chain,
          start_time: "",
          end_time: "",
        };
        const findIndicator = (list: IndicatorListResDto):Indicator => {
          for (const category of list) {
            for (const group of category.groups) {
              const foundIndicator = group.indicators.find(indicator => 
                indicator.handle_name === handle_name 
              );
              
              if (foundIndicator){
                return foundIndicator;
              } 
            }
          }
          return null as unknown as Indicator;
        };
        const indicatorInfo = findIndicator(indicatorList);
        if (indicatorInfo) {
          draft.indicatorInfo = indicatorInfo;
        }
      });
    }
  }, [symbol, handle_name,indicatorList, setDraftData]);

  React.useEffect(() => {
    return () => {
      removeChartStore();
    };
  }, [removeChartStore]);

  return (
    <div className={styles.charts}>
      <div className={styles.content}>
        <Search />
        <Divider type="vertical" style={{ height: "100vh", margin: 0 }} />
        <DataPanel />
      </div>
    </div>
  );
};

export default Charts;
