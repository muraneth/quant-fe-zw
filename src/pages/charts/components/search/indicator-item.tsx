import * as React from "react";
import classNames from "classnames";
import type { Indicator } from "@/service/charts";
import { useChartStore } from "@/store/charts";
import styles from "./index.module.scss";

type IndicatorItemProps = Indicator;

const IndicatorItem: React.FC<IndicatorItemProps> = ({
  required_level = 1,
  name = "",
  handler_name = "",
}) => {
  const setIndicatorInfo = useChartStore((state) => state.setIndicatorInfo);

  const chooseIndicator = () => {
    setIndicatorInfo({ handler_name, required_level: required_level - 1 });
  };

  return (
    <div className={styles.indicatorItem} onClick={chooseIndicator}>
      <span
        className={classNames(styles.indicatorItemLevel, {
          [styles[`indicatorItemLevel${required_level - 1}`]]: true,
        })}
      >
        {`L${required_level - 1}`}
      </span>
      <span className={styles.indicatorName}>{name}</span>
    </div>
  );
};

export default IndicatorItem;
