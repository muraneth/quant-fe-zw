import classNames from "classnames";
import type { Indicator } from "@/service/charts";
import styles from "./index.module.scss";
import React from "react";

type IndicatorItemProps = Indicator;

const IndicatorItem: React.FC<IndicatorItemProps> = ({
  required_level = 1,
  name = ''
}) => {
  return (
    <div className={styles.indicatorItem}>
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
