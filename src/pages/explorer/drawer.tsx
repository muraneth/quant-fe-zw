import { Tree, Button } from "antd";
import type { DataNode } from "antd/es/tree";

import { useImmer } from "use-immer";
import {
  getUserConfig,
  getIndicatorList,
  saveUserConfig,
} from "@/service/explorer";
import { useRequest } from "ahooks";
import { Indicator, IndicatorCategory } from "@/service/charts";

const MyDrawer: React.FC = () => {
  const [selectedIndicators, setSelectedIndicators] = useImmer<
    Array<Indicator>
  >([]);

  const [categories, setCategories] = useImmer<Array<IndicatorCategory>>([]);
  const [checkedKeys, setCheckedKeys] = useImmer<React.Key[]>([]);

  useRequest(() => getUserConfig(), {
    onSuccess: (res) => {
      setSelectedIndicators(res.indicators);
      // Set initially checked keys based on selected indicators
      const keys = res.indicators.map((ind) => ind.handle_name);
      setCheckedKeys(keys);
    },
  });

  // Fetch all available indicators
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

  // Helper function to get count of selected indicators in a category
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
              {/* <span >
                {indicator.description}
              </span> */}
            </div>
          ),
          key: indicator.handle_name,
          isLeaf: true,
          checkable: true,
        })),
      })),
    }));

  const handleCheck = (checked: React.Key[] | { checked: React.Key[] }) => {
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

    setSelectedIndicators(newSelectedIndicators);
  };
  const { runAsync: runSaveSetting, loading: runSaveSettingLoading } =
    useRequest(
      () =>
        saveUserConfig({
          indicators: selectedIndicators.map((ind) => ind.handle_name),
        }),
      { manual: true }
    );

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <h3>Choose Indicator</h3>
        <Button
          style={{ fontSize: "12px" }}
          loading={runSaveSettingLoading}
          onClick={runSaveSetting}
        >
          Save Setting
        </Button>
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
