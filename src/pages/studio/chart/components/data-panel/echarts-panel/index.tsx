import * as React from "react";
import { LoadingOutlined, RedoOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { useChartStore } from "@/store/charts";
import { getIndicatorDetail, getBasePrice } from "@/service/charts";
import BaseChart from "./base-chart";
import { generateOptions } from "@/utils/echarts";
import styles from "../index.module.scss";

const EchartsPanel = () => {
  const { symbol, chain, start_time, end_time } = useChartStore.use.tokenInfo();
  const { handle_name, type } = useChartStore.use.indicatorInfo();

  const indicatorDetailList = useChartStore.use.indicatorDetailList();
  const priceList = useChartStore.use.priceList();
  const klineType = useChartStore.use.klineType();
  const base_params = useChartStore.use.base_params();
  const extra_params = useChartStore.use.extra_params();
  const options = useChartStore.use.options();

  const setDraftData = useChartStore.use.setDraftData();

  const {
    loading: getIndicatorDetailLoading,
    error: getIndicatorDetailError,
    run: runGetIndicatorDetail,
  } = useRequest(
    () => {
      if (!symbol || !chain || !handle_name)
        return [] as unknown as Promise<any>;
      return getIndicatorDetail({
        symbol,
        chain,
        start_time,
        end_time,
        handle_name,
        base_params,
        extra_params,
      });
    },
    {
      refreshDeps: [
        symbol,
        chain,
        start_time,
        end_time,
        handle_name,
        base_params,
        extra_params,
      ],
      onSuccess: (res) => {
        setDraftData((draft) => {
          draft.indicatorDetailList = res;
        });
      },
    }
  );

  const {
    loading: getBasePriceLoading,
    error: getBasePriceError,
    run: runGetBasePrice,
  } = useRequest(
    () => {
      if (!symbol || !chain) return [] as unknown as Promise<any>;
      return getBasePrice({
        symbol,
        chain,
        start_time,
        end_time,
      });
    },
    {
      refreshDeps: [symbol, chain, start_time, end_time],
      onSuccess: (res) => {
        setDraftData((draft) => {
          draft.priceList = res;
        });
      },
    }
  );

  React.useEffect(() => {
<<<<<<< HEAD
    if (indicatorDetailList?.length && priceList?.length && klineType && type) {
      setDraftData((draft) => {
=======
    if (Array.isArray(indicatorDetailList) && Array.isArray(priceList) && klineType && type) {
      setDraftData(draft => {
>>>>>>> main
        draft.options = generateOptions({
          type,
          indicatorDetailList,
          priceList,
          klineType,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indicatorDetailList, priceList, klineType, type]);

  const renderContent = () => {
    if (getIndicatorDetailError || getBasePriceError)
      return (
        <RedoOutlined
          style={{ color: "gray" }}
          onClick={() => {
            runGetIndicatorDetail();
            runGetBasePrice();
          }}
        />
      );
    return (
      <>
        {getIndicatorDetailLoading || getBasePriceLoading ? (
          <LoadingOutlined style={{ fontSize: 20, position: "absolute" }} />
        ) : null}
        <BaseChart options={options} />
      </>
    );
  };

  return <div className={styles.echartsWrapper}>{renderContent()}</div>;
};

export default EchartsPanel;
