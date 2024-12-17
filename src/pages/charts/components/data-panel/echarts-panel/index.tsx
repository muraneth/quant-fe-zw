import * as React from "react";
import { LoadingOutlined, RedoOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { useChartStore } from "@/store/charts";
import { getIndicatorDetail, getBasePrice } from "@/service/charts";
import BaseChart from "./base-chart";
import { generateOptions } from "@/utils/echarts";
import styles from "../index.module.scss";
const EchartsPanel = () => {
  const options = useChartStore.use.options();
  const chartData = useChartStore.use.chartData();
  const klineType = useChartStore.use.klineType();
  const { symbol, chain,start_time,end_time } = useChartStore.use.tokenInfo();
  const { handle_name, type } = useChartStore.use.indicatorInfo();
  const base_params = useChartStore.use.base_params();
  const extra_params = useChartStore.use.extra_params();
  const setOptions = useChartStore.use.setOptions();
  const setChartData = useChartStore.use.setChartData();
  const setHasLevelAuth = useChartStore.use.setHasLevelAuth();

  const {
    loading,
    error,
    run: runGetIndicatorDetail,
  } = useRequest(
    () => {
      if (!symbol || !chain || !handle_name)
        return [] as unknown as Promise<any[]>;
      return Promise.all([
        getIndicatorDetail({
          symbol,
          chain,
          start_time,
          end_time,
          handle_name: handle_name,
          base_params,
          extra_params,
        }),
        getBasePrice({
          symbol,
          chain,
          start_time,
          end_time,
        }),
      ]);
    },
    {
      refreshDeps: [symbol, chain, handle_name, base_params, extra_params],
      onSuccess: (res) => {
        if (!res.length) return;
        if (res[0]?.code === 3026) {
          setHasLevelAuth(false);
          return;
        }
        setHasLevelAuth(true);
        setChartData({ indicatorData: res[0], klineList: res[1] });
      },
    }
  );

  React.useEffect(() => {
    const { indicatorData, klineList } = chartData || {};
    if (indicatorData && klineList && klineType && type) {
      setOptions(
        generateOptions({
          type,
          indicatorData,
          klineList,
          klineType,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData, klineType, type]);

  console.log("echartsOptions:", options);
  const renderContent = () => {
    if (loading && !options)
      return <LoadingOutlined style={{ fontSize: 20 }} />;
    if (error)
      return (
        <RedoOutlined
          style={{ color: "gray" }}
          onClick={runGetIndicatorDetail}
        />
      );
    return <BaseChart options={options} />;
  };

  return <div className={styles.echartsWrapper}>{renderContent()}</div>;
};

export default EchartsPanel;
