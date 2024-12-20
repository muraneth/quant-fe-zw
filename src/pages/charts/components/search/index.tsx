import { useImmer } from "use-immer";
import { Input } from "antd";
import { useRequest } from "ahooks";
import { getIndicatorList } from "@/service/charts";
import { svgMap } from "@/constants/svg";
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    if (e.target.value) {
      if (curView !== View.Result) {
        toNextView(View.Result);
      }
    } else {
      backPreView();
    }
  };

  const handleSelectCategory = (categoryIndex: number) => {
    setSelectedCategoryIndex(categoryIndex);
    toNextView(View.Group);
  };

  const handleResultBackView = () => {
    backPreView();
    setSearchKeyword("");
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
          backPreView={handleResultBackView}
          indicatorList={indicatorList}
          searchKeyword={searchKeyword}
        />
      ) : null}
    </div>
  );
};

export default Search;
