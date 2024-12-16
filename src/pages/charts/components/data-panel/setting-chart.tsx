import { Segmented, Popover, Checkbox } from "antd";
import { svgMap } from "@/constants/svg";
import { useChartStore } from "@/store/charts";
import FormRender, { useForm } from "form-render";
import type { GetProp } from "antd";
import styles from "./index.module.scss";
import classNames from "classnames";


const options = [
  { label: "DEX", value: "DEX" },
  { label: "CEX", value: "CEX" },
  { label: "MEV Bot", value: "MEV Bot" },
  { label: "Contract", value: "Contract" },
  { label: "Staker", value: "Staker" },
];

const SettingChart = () => {
  const klineType = useChartStore.use.klineType();
  const setKlineType = useChartStore.use.setKlineType();
  const base_params = useChartStore.use.base_params();
  const setBaseParams = useChartStore.use.setBaseParams();
  const setExtraParams = useChartStore.use.setExtraParams();
  const indicatorInfo = useChartStore.use.indicatorInfo();
  // console.log("indicatorInfo", indicatorInfo);
  
  const param_schema = indicatorInfo.param_schema;
  const { use_base_param, extra_params } =
    JSON.parse((param_schema || null) as string) || {};
  // extra_params.column = 3;

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
    <>
      <div className={styles.topInfo}>
        <div className={styles.left}>
          {/* <img
            className={styles.img}
            src="https://assets.coingecko.com/coins/images/18111/large/Doge.png?1696517615"
          /> */}
           <span
            className={classNames(styles.indicatorItemLevel, {
              [styles[`indicatorItemLevel${indicatorInfo.required_level }`]]: true,
            })} 
          >
            {`L${indicatorInfo.required_level  }`}
          </span>
          <span className={styles.title}>{indicatorInfo.name}</span>
          {/* <span className={styles.desc}>{indicatorInfo.description}</span> */}
        </div>
        <Segmented
          options={[
            { value: "avgPrice", icon: svgMap["kine"] },
            { value: "kline", icon: svgMap["switch"] },
          ]}
          value={klineType}
          onChange={setKlineType}
        />
      </div>
      <div className={styles.setting}>
        {svgMap["settingIcon"]}
        <span className={styles.settingTitle}>Parameter Setting</span>
        {use_base_param ? (
          <div>
            <Popover
              placement="bottomLeft"
              content={
                <Checkbox.Group
                  options={options}
                  value={base_params?.exclude_wallets?.by_labels || []}
                  onChange={handleBaseChange}
                />
              }
            >
              设置 base
            </Popover>
          </div>
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
            style={{ marginLeft: 20 }}
          />
        ) : null}
      </div>
    </>
  );
};

export default SettingChart;
