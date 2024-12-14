import * as React from "react";
import { useImmer } from "use-immer";
import { LoadingOutlined, RedoOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { useChartStore } from "@/store/charts";
import { getIndicatorDetail, getBasePrice } from "@/service/charts";
import BaseChart from "./base-chart";
import { generateOptions } from "@/utils/echarts";
import styles from "../index.module.scss";

const EchartsPanel = () => {
  const [options, setOptions] = useImmer({});
  const [chartData, setChartData] = useImmer<any>({
    indicatorData: null,
    klineList: null,
  });

  const klineType = useChartStore((state) => state.klineType);
  const { symbol, chain } = useChartStore((state) => state.tokenInfo) || {};
  const { handler_name, type } =
    useChartStore((state) => state.indicatorInfo) || {};

  const {
    loading,
    error,
    run: runGetIndicatorDetail,
  } = useRequest(
    () => {
      if (!symbol || !chain || !handler_name)
        return [] as unknown as Promise<any[]>;
      return Promise.all([
        getIndicatorDetail({
          symbol,
          chain,
          handler_name,
          base_params: {},
          extra_params: {},
        }),
        getBasePrice({
          symbol,
          chain,
          extra_params: {},
        }),
      ]);
    },
    {
      refreshDeps: [symbol, chain, handler_name],
      onSuccess: (res) => {
        if (!res.length) return;
        setChartData({ indicatorData: res[0], klineList: res[1] });
      },
    }
  );

  React.useEffect(() => {
    const { indicatorData, klineList } = chartData;
    if (indicatorData && klineList && klineType && type) {
      setOptions(
        generateOptions({
          type,
          indicatorData: chartData.indicatorData,
          klineList: chartData.klineList,
          klineType,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData, klineType, type]);

  console.log("echartsOptions:", options);

  const renderContent = () => {
    if (loading) return <LoadingOutlined style={{ fontSize: 20 }} />;
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
