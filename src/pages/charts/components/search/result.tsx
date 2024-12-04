import * as React from "react";
import IndicatorItem from "./indicator-item";
import type { IndicatorListResDto } from "@/service/charts";
import type { Indicator } from "@/service/charts";

interface ResultProps {
  indicatorList: IndicatorListResDto;
  searchKeyword: string;
}

const Result: React.FC<ResultProps> = ({
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

  return (filterIndicatorList || []).map((item, index) => (
    <IndicatorItem key={index} {...item} />
  ));
};

export default Result;
