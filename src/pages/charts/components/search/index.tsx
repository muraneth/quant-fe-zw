import { Tabs } from "antd";
import type { TabsProps } from "antd";
import FullSearch from "./full";
import CollectedSearch from "./collected";
import { useRequest } from "ahooks";
import { getIndicatorList } from "@/service/charts";
import { useChartStore } from "@/store/charts";
import styles from "./index.module.scss";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Full",
    children: <FullSearch />,
  },
  {
    key: "2",
    label: "Collected",
    children: <CollectedSearch />,
  },
];

const Search = () => {
  const setDraftData = useChartStore.use.setDraftData();

  useRequest(getIndicatorList, {
    onSuccess: (res) => {
      setDraftData((draft) => {
        draft.indicatorList = res;
      });
    },
  });

  return (
    <div className={styles.searchWrapper}>
      <Tabs destroyInactiveTabPane defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Search;
