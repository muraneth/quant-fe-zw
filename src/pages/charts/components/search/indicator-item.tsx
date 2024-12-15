import * as React from "react";
import type { Indicator } from "@/service/charts";
import { useChartStore } from "@/store/charts";
import classNames from "classnames";
import styles from "./index.module.scss";

type IndicatorItemProps = Indicator;

const IndicatorItem: React.FC<IndicatorItemProps> = ({
  required_level = 1,
  name = "",
  handle_name = "",
  type,
  id,
}) => {
  const selectedIndicatorsId = useChartStore(
    (state) => state.indicatorInfo.selectedIndicatorsId
  );
  const setIndicatorInfo = useChartStore((state) => state.setIndicatorInfo);

  const chooseIndicator = () => {
    setIndicatorInfo({
      handle_name,
      required_level: required_level - 1,
      type,
      selectedIndicatorsId: id,
    });
  };

  return (
    <div
      className={classNames(styles.indicatorItem, [
        { [styles.indicatorItemActive]: selectedIndicatorsId === id },
      ])}
      onClick={chooseIndicator}
    >
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
