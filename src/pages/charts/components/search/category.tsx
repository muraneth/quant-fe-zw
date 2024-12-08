import * as React from "react";
import { Tooltip } from "antd";
import { IndicatorListResDto } from "@/service/charts";
import classNames from "classnames";
import styles from "./index.module.scss";

interface CategoryProps {
  indicatorList: IndicatorListResDto;
  selectCategory: (category: number) => void;
  selectedCategoryIndex: number;
}

const Category: React.FC<CategoryProps> = ({
  indicatorList,
  selectCategory,
  selectedCategoryIndex,
}) => {
  return (
    <div className={styles.category}>
      {(indicatorList || []).map(({ category, order }, index) => {
        return (
          <div
            className={classNames(styles.categoryItem, {
              [styles.categoryItemSelected]: selectedCategoryIndex === index,
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
            <span className={styles.indicatorsNum}>{order}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Category;
