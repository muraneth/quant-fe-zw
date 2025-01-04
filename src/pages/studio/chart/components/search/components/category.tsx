import * as React from "react";
import { Tooltip } from "antd";
import { IndicatorListResDto } from "@/service/charts";
import { useChartStore } from "@/store/charts";
import classNames from "classnames";
import styles from "../index.module.scss";

interface CategoryProps {
  indicatorList: IndicatorListResDto;
  selectCategory: (category: number) => void;
}

const Category: React.FC<CategoryProps> = ({
  indicatorList,
  selectCategory,
}) => {
  const indicatorInfo = useChartStore.use.indicatorInfo();
  return (
    <div className={styles.category}>
      {(indicatorList || []).map(({ category, groups }, index) => {
        const allIndicatorsNum = groups.reduce(
          (pre, cur) => (pre += cur.indicators.length),
          0
        );
        return (
          <div
            className={classNames(styles.categoryItem, {
              [styles.categoryItemSelected]:
                indicatorInfo.category === category,
            })}
            key={index}
            onClick={() => selectCategory(index)}
          >
            {category.length >= 15 ? (
              <Tooltip title={category}>
                <span
                  className={classNames(styles.categoryName, [
                    "common-ellipsis-1",
                  ])}
                >
                  {category}
                </span>
              </Tooltip>
            ) : (
              category
            )}
            <span className={styles.indicatorsNum}>{allIndicatorsNum}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Category;
