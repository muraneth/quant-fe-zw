import * as React from "react";
import { useImmer } from "use-immer";
import { Input } from "antd";
import { svgMap } from "@/constants/svg";
import Group from "./components/group";
import Result from "./components/result";
import { useChartStore } from "@/store/charts";
import { useStack } from "@/hooks/use-stack";
import styles from "./index.module.scss";

enum View {
  Group,
  Result,
}

const CollectedSearch = () => {
  const indicatorList = useChartStore.use.indicatorList();
  const collectedIndicatorList: any = React.useMemo(() => {
    return [
      {
        groups: indicatorList.reduce((pre, cur) => {
          pre.push({
            group_name: cur.category,
            indicators: cur.groups.reduce(
              (groupItemPre, groupItem) =>
                groupItemPre.concat(
                  groupItem.indicators.filter((item) => item.collected) as any
                ),
              []
            ),
          } as never);
          return pre;
        }, []),
      },
    ];
  }, [indicatorList]);

  const [searchKeyword, setSearchKeyword] = useImmer<string>("");
  const { stackTop, stackIn, stackOut } = useStack({
    initStackList: [View.Group],
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    if (e.target.value) {
      if (stackTop !== View.Result) {
        stackIn(View.Result);
      }
    } else {
      stackOut();
    }
  };

  const handleResultBackView = () => {
    stackOut();
    setSearchKeyword("");
  };

  const viewMap = {
    [View.Group]: (
      <Group
        indicatorList={collectedIndicatorList}
        selectedCategoryIndex={0}
        showBack={false}
      />
    ),
    [View.Result]: (
      <Result
        backPreView={handleResultBackView}
        indicatorList={collectedIndicatorList}
        searchKeyword={searchKeyword}
      />
    ),
  };

  return (
    <div className={styles.search}>
      <div className={styles.filter}>
        <Input
          placeholder="Filter Metrics"
          suffix={svgMap["filterMetries"]}
          allowClear
          onChange={handleSearch}
          value={searchKeyword}
        />
      </div>
      {viewMap[stackTop]}
    </div>
  );
};

export default CollectedSearch;
