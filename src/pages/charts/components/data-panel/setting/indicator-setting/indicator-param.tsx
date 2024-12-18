import { useEffect } from "react";
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
  const setTokenInfo = useChartStore.use.setTokenInfo();
  const tokenInfo = useChartStore.use.tokenInfo();
  const param_schema = indicatorInfo.param_schema;
  const { use_base_param, extra_params_schema = {} } =
    JSON.parse((param_schema || null) as string) || {};
  extra_params_schema.displayType = "row";
  extra_params_schema.column = 1;

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
    if (indicatorInfo.handle_name.startsWith("pbv.")) {
      setTokenInfo({
        ...tokenInfo,
        start_time: allValues.time_range[0],
        end_time: allValues.time_range[1],
      });
    }
  };
  // useEffect(() => {
  //   if (extra_params_schema.properties) {
  //     var extra_params: Record<string, any> = {};
  //     const properties = extra_params_schema.properties;

  //     // Set default values for properties
  //     Object.keys(properties).forEach((key) => {
  //       const prop = properties[key];
  //       if (prop.default !== undefined && prop.default !== null) {
  //         extra_params[key] = prop.default;
  //       }
  //     });
  //     setExtraParams(extra_params);
  //   }
  // }, [extra_params_schema]);
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
            <span className={styles.title}>Label Filter</span>
            <span>DEX / CEX / MEV Bot</span>
            {svgMap["downOutlined"]}
          </span>
        </Popover>
      ) : null}
      {extra_params_schema ? (
        <FormRender
          form={form}
          schema={extra_params_schema}
          //   onMount
          watch={{
            "#": (allValues) => {
              handleExtraChange(allValues);
            },
          }}
          style={{ marginLeft: 24, width: 300 }}
          //   labelCol={60}
          fieldCol={17}
        />
      ) : null}
    </div>
  );
};
export default IndicatorParam;
