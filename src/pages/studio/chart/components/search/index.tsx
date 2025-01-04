import { Tabs } from "antd";
import type { TabsProps } from "antd";
import FullSearch from "./full";
import CollectedSearch from "./collected";
import { useRequest } from "ahooks";
import { getIndicatorList, IndicatorListResDto } from "@/service/charts";
import { useChartStore } from "@/store/charts";
import styles from "./index.module.scss";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "All Indicators",
    children: <FullSearch />,
  },
  {
    key: "2",
    label: "My Collected",
    children: <CollectedSearch />,
  },
];

const Search = () => {
  const setDraftData = useChartStore.use.setDraftData();
  const { symbol, chain } = useChartStore.use.tokenInfo();

  useRequest(
    () => {
      if (symbol && chain) {
        return getIndicatorList({ symbol, chain });
      }
      return null as any;
    },
    {
      onSuccess: (res: IndicatorListResDto) => {
        if (res) {
          setDraftData((draft) => {
            draft.indicatorList = res;
          });
        }
      },
      refreshDeps: [symbol, chain]
    }
  );

  return (
    <div className={styles.searchWrapper}>
      <Tabs
        type="line"
        destroyInactiveTabPane
        defaultActiveKey="1"
        items={items}
      />
    </div>
  );
};

export default Search;
