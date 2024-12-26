import * as React from "react";
import type { Indicator } from "@/service/charts";
import { useChartStore } from "@/store/charts";
import classNames from "classnames";
import styles from "./index.module.scss";

type IndicatorItemProps = Indicator;

const IndicatorItem: React.FC<IndicatorItemProps> = (indicatorInfoItem) => {
  const { param_schema, category, handle_name, required_level, name } =
    indicatorInfoItem || {};

  const setDraftData = useChartStore.use.setDraftData();
  const indicatorInfo = useChartStore.use.indicatorInfo();
  const resetChartPanelData = useChartStore.use.resetChartPanelData();

  const getDefaultExtraParams = () => {
    const { extra_params_schema = {} } =
      JSON.parse((param_schema || null) as string) || {};

    if (extra_params_schema.properties) {
      const defaultExtraParams: Record<string, any> = {};
      const properties = extra_params_schema.properties;

      Object.keys(properties).forEach((key) => {
        const prop = properties[key];
        const defaultValue = prop?.default;
        const customWidgetDefaultValue = prop?.props?.default_value;
        if (defaultValue !== undefined && defaultValue !== null) {
          defaultExtraParams[key] = prop.default;
        } else if (
          customWidgetDefaultValue !== undefined &&
          customWidgetDefaultValue !== null
        ) {
          defaultExtraParams[key] = prop.props.default_value;
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
    setDraftData((draft) => {
      draft.indicatorInfo = indicatorInfoItem;
    });
    setDraftData((draft) => {
      draft.extra_params = getDefaultExtraParams();
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
