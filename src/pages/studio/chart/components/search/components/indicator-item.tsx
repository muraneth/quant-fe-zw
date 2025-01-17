import * as React from "react";
import type { Indicator } from "@/service/charts";
import { useChartStore } from "@/store/charts";
import classNames from "classnames";
import styles from "../index.module.scss";
import { useSearchParams } from "react-router-dom";
import { getDefaultExtraParams } from '@/utils/common';

type IndicatorItemProps = Indicator;

const IndicatorItem: React.FC<IndicatorItemProps> = (indicatorInfoItem) => {
  const { param_schema, category, handle_name, required_level, name, type } =
    indicatorInfoItem || {};

  const setDraftData = useChartStore.use.setDraftData();
  const indicatorInfo = useChartStore.use.indicatorInfo();
  const resetChartPanelData = useChartStore.use.resetChartPanelData();
  const [searchParams, setSearchParams] = useSearchParams();

  const chooseIndicator = () => {
    resetChartPanelData({
      refreshChart:
        indicatorInfo.category !== category || type !== indicatorInfo.type,
    });
    const newParams = new URLSearchParams(searchParams);
    newParams.set("handle_name", indicatorInfoItem.handle_name);
    setSearchParams(newParams);
    setDraftData((draft) => {
      draft.indicatorInfo = indicatorInfoItem;
    });
    setDraftData((draft) => {
      draft.extra_params = getDefaultExtraParams(param_schema);
    });
  };

  return (
    <div
      className={classNames(styles.indicatorItem, [
        {
          [styles.indicatorItemActive]:
            indicatorInfo.handle_name === handle_name,
        },
      ])}
      onClick={chooseIndicator}
    >
      <span
        className={classNames(styles.indicatorItemLevel, {
          [styles[`indicatorItemLevel${required_level}`]]: true,
        })}
      >
        {`L${required_level}`}
      </span>
      <span className={styles.indicatorName}>{name}</span>
      {/* <div className={classNames(styles.indicatorItemLevel, {
          [styles[`indicatorItemLevel${required_level - 1}`]]: true,
        })}>{svgMap["paramSetting"]}</div> */}
    </div>
  );
};

export default IndicatorItem;
