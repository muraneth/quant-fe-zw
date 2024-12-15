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
  param_schema,
}) => {
  const selectedIndicatorsId =
    useChartStore.use.indicatorInfo().selectedIndicatorsId;
  const setIndicatorInfo = useChartStore.use.setIndicatorInfo();
  const setBaseParams = useChartStore.use.setBaseParams();
  const setExtraParams = useChartStore.use.setExtraParams();
  const setOptions = useChartStore.use.setOptions();
  const setChartData = useChartStore.use.setChartData();

  const resetStoreData = () => {
    setBaseParams({});
    setExtraParams({});
    setOptions(null);
    setChartData(null);
  };

  const chooseIndicator = () => {
    resetStoreData();
    setIndicatorInfo({
      handle_name,
      required_level: required_level - 1,
      type,
      selectedIndicatorsId: id,
      param_schema,
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
