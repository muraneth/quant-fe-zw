import { Tree } from "antd";
import type { DataNode } from "antd/es/tree";

import { useImmer } from "use-immer";
import {
  getUserConfig,
  getIndicatorList,
  saveUserIndicator,
} from "@/service/explorer";
import { useRequest } from "ahooks";
import { Indicator, IndicatorCategory } from "@/service/charts";
import { getUserInfo } from "@/utils/common";
const MyDrawer: React.FC = () => {
  const userInfo = getUserInfo();

  const [categories, setCategories] = useImmer<Array<IndicatorCategory>>([]);
  const [checkedKeys, setCheckedKeys] = useImmer<React.Key[]>([]);
  useRequest(() => getUserConfig(), {
    onSuccess: (res) => {
      const keys = res.indicators.map((ind) => ind.handle_name);
      setCheckedKeys(keys);
    },
  });

  useRequest(() => getIndicatorList(), {
    onSuccess: (res) => {
      setCategories(res);
    },
  });

  const getSelectedCount = (indicators: Indicator[]): number => {
    return indicators.filter((indicator) =>
      checkedKeys.includes(indicator.handle_name)
    ).length;
  };
  const checkIfLeafAvailable = (indicator: Indicator): boolean => {
    return userInfo.level >= indicator.required_level;
  };
  const getCategorySelectedCount = (category: IndicatorCategory): number => {
    return category.groups.reduce(
      (sum, group) => sum + getSelectedCount(group.indicators),
      0
    );
  };

  // Helper function to get total indicators in a category
  const getCategoryTotalCount = (category: IndicatorCategory): number => {
    return category.groups.reduce(
      (sum, group) => sum + group.indicators.length,
      0
    );
  };

  const treeData: DataNode[] = categories
    // .sort((a, b) => a.order - b.order)
    .map((category) => ({
      title: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <span>{category.category}</span>
          <span style={{ color: "gray" }}>
            ({getCategorySelectedCount(category)}/
            {getCategoryTotalCount(category)})
          </span>
        </div>
      ),
      key: category.category,
      selectable: false,
      checkable: false,
      children: category.groups.map((group) => ({
        title: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <span>{group.group_name}</span>
            <span style={{ color: "gray" }}>
              ({getSelectedCount(group.indicators)}/{group.indicators.length})
            </span>
          </div>
        ),
        key: `${category.category}-${group.group_name}`,
        selectable: false,
        checkable: false,
        children: group.indicators.map((indicator) => ({
          title: (
            <div>
              <span>{indicator.name}</span>
            </div>
          ),
          key: indicator.handle_name,
          isLeaf: true,
          // checkable: true,
          disableCheckbox: !checkIfLeafAvailable(indicator),
        })),
      })),
    }));

  const handleCheck = async (
    checked: React.Key[] | { checked: React.Key[] }
  ) => {
    const keys = Array.isArray(checked) ? checked : checked.checked;
    setCheckedKeys(keys);

    // Update selectedIndicators based on checked keys
    const newSelectedIndicators = categories.flatMap((category) =>
      category.groups.flatMap((group) =>
        group.indicators.filter((indicator) =>
          keys.includes(indicator.handle_name)
        )
      )
    );

    try {
      saveUserIndicator({
        indicators: newSelectedIndicators.map((ind) => ind.handle_name),
      });
      // setDraftData((draft) => {
      //   draft.userConfig.indicators = newSelectedIndicators;
      // });
    } catch (error) {
      console.error("Failed to save settings:", error);
      // You might want to add error handling here
    }
  };

  const upgradeHit = () => {
    return (
      <div>
        {userInfo.level <= 2 ? (
          <div>
            If you want more indicators, you can upgrade your plan
            <a href="/pricing">Upgrade plan</a>
          </div>
        ) : null}
      </div>
    );
  };
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3>Choose Indicator</h3>
        <div style={{ marginBottom: "10px", color: "gray" }}>
          {upgradeHit()}
        </div>
      </div>

      <Tree
        checkable
        defaultExpandAll
        checkedKeys={checkedKeys}
        onCheck={handleCheck}
        treeData={treeData}
      />
    </div>
  );
};

export default MyDrawer;
