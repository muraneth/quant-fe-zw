
import { Button, Checkbox, Popover,Divider } from "antd";
import FormRender, { useForm } from "form-render";
import { useChartStore } from "@/store/charts";
import { svgMap } from "@/constants/svg";
import type { GetProp } from "antd";
import styles from "./index.module.scss";
import CustomDatePicker from "@/components/custom-date-picker";
import { saveIndicatorParam } from "@/service/charts";
import { useRequest } from "ahooks";
import { getUserInfo } from "@/utils/common";
const label_options = [
  { label: "DEX", value: "DEX" },
  { label: "CEX", value: "CEX" },
  { label: "MEV Bot", value: "MEV Bot" },
  { label: "Contract", value: "Contract" },
  { label: "Staker", value: "Staker" },
];

const IndicatorParam = () => {
  const setDraftData = useChartStore.use.setDraftData();
  const userInfo = getUserInfo();
  const base_params = useChartStore.use.base_params();
  const extra_params = useChartStore.use.extra_params();
  // const chart_options = useChartStore.use.options();
  const { param_schema, handle_name } = useChartStore.use.indicatorInfo();
  const { use_base_param, extra_params_schema } =
    JSON.parse((param_schema || null) as string) || {};
  if (extra_params_schema) {
    extra_params_schema.displayType = "inline";
  }

  const form = useForm();

  const handleBaseChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    setDraftData((draft) => {
      draft.base_params = {
        exclude_wallets: {
          by_labels: checkedValues,
        },
      };
    });
  };

  const handleExtraChange = (allValues: Record<string, any>) => {
    console.log("schema all values:", allValues);
    setDraftData((draft) => {
      draft.extra_params = {
        ...extra_params,
        ...allValues,
      };
    });
    // setDraftData((draft) => {
    //   draft.extra_params = allValues;
    // });
  };
  // const onSmoothChange = () => {
  //   if (chart_options) {
  //     chart_options.series.forEach((item: any) => {
  //       if (item.name == "Indicator" && item.type == "line") {
  //         item.smooth = !item.smooth;
  //       }
  //     });
  //   }
  // };

  const { runAsync: runSaveIndicator, loading: runSaveIndicatorLoading } =
    useRequest(
      () =>
        saveIndicatorParam({
          handle_name,
          base_params: JSON.stringify(base_params),
          extra_params: JSON.stringify(extra_params),
        }),
      { manual: true }
    );

  // React.useEffect(() => {
  //   form.resetFields();
  // }, [form, extra_params_schema]);
  function checkIfAvailableForParam() {
    return userInfo?.level >= 3;
  }
  return (
    <div className={styles.setting}>
      {use_base_param ? (
        <Popover
          placement="bottomLeft"
          content={
            <div style={{
              display: "flex",
              flexDirection: "column",  // Stack items vertically
              gap: "8px" 
              }}>
              <h3 style={{padding:0,margin:0}}>Recalculate the indicator after filtering specific wallets</h3>
              
              <Divider  style={{padding:0,margin:0}}/>
              <Checkbox.Group
              options={label_options.map(option => ({
                ...option,
                disabled: !checkIfAvailableForParam()
              }))}
              value={base_params?.exclude_wallets?.by_labels || []}
              onChange={handleBaseChange}
              className={styles.checkboxGrop}

            />
            {!checkIfAvailableForParam() && (
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                alignItems: "center"
              }}>
                <span style={{ color: "gray" }}>
                  This feature requires Advanced plan
                </span>
                <Button type="primary" size="small" onClick={() => window.location.href = '/pricing'}>
                  Upgrade Now
                </Button>
              </div>
            )}
            </div>
            
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
      {/* <Button
        className={styles.saveParam}
        onClick={onSmoothChange}
        size="small"
      >
        Smooth
      </Button> */}
      {extra_params_schema ? (
        <div style={{ alignItems: "center", display: "flex" }}>
          <FormRender
            form={form}
            schema={extra_params_schema}
            widgets={{ CustomDatePicker }}
            watch={{
              "#": (allValues) => {
                handleExtraChange(allValues);
              },
            }}
            style={{ marginLeft: 24 }}
          />
          <Button
            className={styles.saveParam}
            onClick={runSaveIndicator}
            loading={runSaveIndicatorLoading}
            size="small"
          >
            save
          </Button>
        </div>
      ) : null}
    </div>
  );
};
export default IndicatorParam;
