import * as React from "react";
import { useImmer } from "use-immer";
import { Input } from "antd";
import { svgMap } from "@/constants/svg";
import Category from "./components/category";
import Group from "./components/group";
import Result from "./components/result";
import { useChartStore } from "@/store/charts";
import { useStack } from "@/hooks/use-stack";
import styles from "./index.module.scss";

enum View {
  Category,
  Group,
  Result,
}

const FullSearch = () => {
  const indicatorList = useChartStore.use.indicatorList();
  const { stackTop, stackIn, stackOut } = useStack({
    initStackList: [View.Category],
  });

  const [searchKeyword, setSearchKeyword] = useImmer<string>("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useImmer<number>(0);

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

  const handleSelectCategory = (categoryIndex: number) => {
    setSelectedCategoryIndex(categoryIndex);
    stackIn(View.Group);
  };

  const handleResultBackView = () => {
    stackOut();
    setSearchKeyword("");
  };

  const viewMap = {
    [View.Category]: (
      <Category
        indicatorList={indicatorList}
        selectCategory={handleSelectCategory}
      />
    ),
    [View.Group]: (
      <Group
        backPreView={stackOut}
        indicatorList={indicatorList}
        selectedCategoryIndex={selectedCategoryIndex}
        
      />
    ),
    [View.Result]: (
      <Result
        backPreView={handleResultBackView}
        indicatorList={indicatorList}
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

export default FullSearch;
