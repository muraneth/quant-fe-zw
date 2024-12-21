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
  description = "",
  doc,
  type,
  id,
  param_schema,
  category,
}) => {
  const indicatorInfo = useChartStore.use.indicatorInfo();
  const setIndicatorInfo = useChartStore.use.setIndicatorInfo();
  const setExtraParams = useChartStore.use.setExtraParams();
  const resetChartPanelData = useChartStore.use.resetChartPanelData();

  const getDefaultExtraParams = () => {
    const { extra_params_schema = {} } =
      JSON.parse((param_schema || null) as string) || {};

    if (extra_params_schema.properties) {
      const defaultExtraParams: Record<string, any> = {};
      const properties = extra_params_schema.properties;

      Object.keys(properties).forEach((key) => {
        const prop = properties[key];
        if (prop?.default !== undefined && prop?.default !== null) {
          defaultExtraParams[key] = prop.default;
        }
      });

      return defaultExtraParams;
    }

    return {};
  };

  const chooseIndicator = () => {
    resetChartPanelData({
      refreshChart: indicatorInfo.category !== category,
    });
    setIndicatorInfo({
      handle_name,
      name,
      description,
      doc,
      required_level,
      type,
      id,
      param_schema,
      category
    });
    setExtraParams(getDefaultExtraParams());
  };

  return (
    <div
      className={classNames(styles.indicatorItem, [
        { [styles.indicatorItemActive]: indicatorInfo.id === id },
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
