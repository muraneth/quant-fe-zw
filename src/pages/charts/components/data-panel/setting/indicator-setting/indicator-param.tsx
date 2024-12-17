import { Checkbox, Popover } from "antd";
import FormRender, { useForm } from "form-render";
import styles from "./index.module.scss";
import { useChartStore } from "@/store/charts";
import { svgMap } from "@/constants/svg";
import type { GetProp } from "antd";

const options = [
  { label: "DEX", value: "DEX" },
  { label: "CEX", value: "CEX" },
  { label: "MEV Bot", value: "MEV Bot" },
  { label: "Contract", value: "Contract" },
  { label: "Staker", value: "Staker" },
];

const IndicatorParam = () => {
  const base_params = useChartStore.use.base_params();
  const setBaseParams = useChartStore.use.setBaseParams();
  const setExtraParams = useChartStore.use.setExtraParams();
  const indicatorInfo = useChartStore.use.indicatorInfo();

  const param_schema = indicatorInfo.param_schema;
  const { use_base_param, extra_params = {} } = JSON.parse((param_schema || null) as string) || {};
  extra_params.displayType = "row";
  extra_params.column = 1;

  const form = useForm();

  const handleBaseChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    setBaseParams({
      exclude_wallets: {
        by_labels: checkedValues,
      },
    });
  };

  const handleExtraChange = (allValues: Record<string, any>) => {
    setExtraParams(allValues);
  };
  return (
    <div className={styles.setting}>
      {use_base_param ? (
        <Popover
          placement="bottomLeft"
          content={
            <Checkbox.Group
              options={options}
              value={base_params?.exclude_wallets?.by_labels || []}
              onChange={handleBaseChange}
              className={styles.checkboxGrop}
            />
          }
          getPopupContainer={(triggerNode) => triggerNode.parentNode as any}
        >
          <span className={styles.baseSetting}>
            <span>DEX / CEX / MEV Bot</span>
            {svgMap["downOutlined"]}
          </span>
        </Popover>
      ) : null}
      {extra_params ? (
        <FormRender
          form={form}
          schema={extra_params}
          watch={{
            "#": (allValues) => {
              handleExtraChange(allValues);
            },
          }}
          style={{ marginLeft: 24, width: 180 }}
          labelCol={60}
          fieldCol={17}
        />
      ) : null}
    </div>
  );
};
export default IndicatorParam;
