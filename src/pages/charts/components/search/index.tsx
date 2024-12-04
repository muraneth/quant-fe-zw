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
  const [curView, setCurView] = useImmer<View>(View.Category);
  const { data: indicatorList = [] } = useRequest(getIndicatorList);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useImmer<number>(0);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      changeView(View.Category);
      return;
    }
    setSearchKeyword(e.target.value);
    changeView(View.Result);
  };

  const changeView = (view: View) => {
    setCurView(view);
  };

  const handleSelectCategory = (categoryIndex: number) => {
    setSelectedCategoryIndex(categoryIndex);
    changeView(View.Group);
  };

  return (
    <div className={styles.search}>
      <div className={styles.filter}>
        <Input
          placeholder="Filter  Metrics"
          suffix={svgMap["filterMetries"]}
          allowClear
          onChange={handleSearch}
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
          backCaterory={() => changeView(View.Category)}
          indicatorList={indicatorList}
          selectedCategoryIndex={selectedCategoryIndex}
        />
      ) : null}
      {curView === View.Result ? (
        <Result indicatorList={indicatorList} searchKeyword={searchKeyword} />
      ) : null}
    </div>
  );
};

export default Search;
