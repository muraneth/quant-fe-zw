import * as React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import IndicatorItem from "./indicator-item";
import type { IndicatorListResDto } from "@/service/charts";
import type { Indicator } from "@/service/charts";
import styles from "../index.module.scss";

interface ResultProps {
  backPreView: () => void;
  indicatorList: IndicatorListResDto;
  searchKeyword: string;
}

const Result: React.FC<ResultProps> = ({
  backPreView,
  indicatorList = [],
  searchKeyword = "",
}) => {
  const combineIndicators = React.useMemo(() => {
    return indicatorList.reduce((pre, cur) => {
      pre = pre.concat(...cur.groups.map((item) => item.indicators));
      return pre;
    }, [] as Array<Indicator>);
  }, [indicatorList]);

  const filterIndicatorList = combineIndicators.filter((item) =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className={styles.result}>
      <div className={styles.resultToCategory} onClick={backPreView}>
        <ArrowLeftOutlined className={styles.resultToCategoryIcon} />
        <span className={styles.resultToCategoryTitle}>Filtered results</span>
      </div>
      <div className={styles.resultIndicatorWrapper}>
        {(filterIndicatorList || []).map((item, index) => (
          <div key={index} className={styles.resultIndicatorItem}>
            <IndicatorItem {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
