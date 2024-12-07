import { useImmer } from "use-immer";
import { Input } from "antd";
import { useRequest } from "ahooks";
import { getIndicatorList } from "@/service/charts";
import { svgMap } from "@/svg";
import Category from "./category";
import Group from "./group";
import Result from "./result";
import styles from "./index.module.scss";

enum View {
  Category,
  Group,
  Result,
}

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useImmer<string>("");

  const [viewStack, setViewStack] = useImmer<Array<View>>([View.Category]);
  const curView = viewStack[viewStack.length - 1];

  const { data: indicatorList = [] } = useRequest(getIndicatorList);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useImmer<number>(0);

  const toNextView = (nextView: View) => {
    setViewStack((draft) => {
      draft.push(nextView);
    });
  };

  const backPreView = () => {
    setViewStack((draft) => {
      draft.pop();
    });
  };

  // 使用一个栈来实现，封装一个 hook，useStack，其中 useStack 返回入栈，出栈，清空栈，以及栈顶元素获取等方法

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    if (e.target.value) {
      toNextView(View.Result);
    } else {
      backPreView();
    }
  };

  const handleSelectCategory = (categoryIndex: number) => {
    setSelectedCategoryIndex(categoryIndex);
    toNextView(View.Group);
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
      {curView === View.Category ? (
        <Category
          indicatorList={indicatorList}
          selectCategory={handleSelectCategory}
          selectedCategoryIndex={selectedCategoryIndex}
        />
      ) : null}
      {curView === View.Group ? (
        <Group
          backPreView={backPreView}
          indicatorList={indicatorList}
          selectedCategoryIndex={selectedCategoryIndex}
        />
      ) : null}
      {curView === View.Result ? (
        <Result
          backPreView={backPreView}
          indicatorList={indicatorList}
          searchKeyword={searchKeyword}
        />
      ) : null}
    </div>
  );
};

export default Search;
