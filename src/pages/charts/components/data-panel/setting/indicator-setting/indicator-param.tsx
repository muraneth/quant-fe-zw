
import { Checkbox, Popover } from 'antd';
import FormRender, { useForm } from "form-render";
import styles from './index.module.scss';
import { useChartStore } from '@/store/charts';
import { svgMap } from '@/constants/svg';
import type { GetProp } from "antd";
// import { useImmer } from "use-immer";


const options = [
    { label: "DEX", value: "DEX" },
    { label: "CEX", value: "CEX" },
    { label: "MEV Bot", value: "MEV Bot" },
    { label: "Contract", value: "Contract" },
    { label: "Staker", value: "Staker" },
  ];

const IndicatorParam= () => {
        // const [selectedLabels, setSelectedLabels] = useImmer<string[]>([]);

        const base_params = useChartStore.use.base_params();
        const setBaseParams = useChartStore.use.setBaseParams();
        const setExtraParams = useChartStore.use.setExtraParams();
        const indicatorInfo = useChartStore.use.indicatorInfo();
        
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
        <div className={styles.setting}>
        {/* {svgMap["settingIcon"]} */}
        {/* <span className={styles.settingTitle}>Parameter Setting</span> */}
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
              <span className={styles.baseSettingTitle}>Base Params</span>

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
    )
}
export default IndicatorParam;