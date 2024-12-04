import { Collapse } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { IndicatorListResDto } from "@/service/charts";
import IndicatorItem from "./indicator-item";
import styles from "./index.module.scss";
import React from "react";

interface GroupProps {
  backCaterory: () => void;
  indicatorList: IndicatorListResDto;
  selectedCategoryIndex: number;
}

const Group: React.FC<GroupProps> = ({
  backCaterory,
  indicatorList = [],
  selectedCategoryIndex,
}) => {
  const { items, defaultActiveKey } = React.useMemo(() => {
    const items = (indicatorList[selectedCategoryIndex].groups || []).map(
      (groupItem) => {
        const children = groupItem.indicators.map((indicatorItem, index) => (
          <IndicatorItem key={index} {...indicatorItem} />
        ));
        return {
          key: groupItem.group_name,
          label: groupItem.group_name,
          children,
        };
      }
    );
    const defaultActiveKey = items.map((item) => item.key);
    return {
      items,
      defaultActiveKey,
    };
  }, [indicatorList, selectedCategoryIndex]);

  return (
    <div className={styles.group}>
      <div className={styles.groupToCategory} onClick={backCaterory}>
        <ArrowLeftOutlined className={styles.groupToCategoryIcon} />
        <span className={styles.groupToCategoryTitle}>All Categories</span>
      </div>
      <div className={styles.groupList}>
        <Collapse items={items} defaultActiveKey={defaultActiveKey} />
      </div>
    </div>
  );
};

export default Group;
