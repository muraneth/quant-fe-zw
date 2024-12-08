import { useImmer } from "use-immer";
import { LoadingOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { useChartStore } from "@/store/charts";
import { getIndicatorDetail } from "@/service/charts";
import BaseChart from "./base-chart";
import { generateOptions } from "@/utils/echarts";

const MiddleChart = () => {
  const [options, setOptions] = useImmer({});

  const { symbol, chain } = useChartStore((state) => state.tokenInfo) || {};
  const { handler_name, type } =
    useChartStore((state) => state.indicatorInfo) || {};

  const { loading } = useRequest(
    () => {
      if (!symbol || !chain || !handler_name)
        return [] as unknown as Promise<Array<Record<string, any>>>;
      return getIndicatorDetail({
        symbol,
        chain,
        handler_name,
        extra_params: {},
      });
    },
    {
      refreshDeps: [symbol, chain, handler_name],
      onSuccess: (indicatorData) => {
        if (!indicatorData.length) return;
        setOptions(generateOptions(type, indicatorData));
      },
    }
  );

  if (loading) return <LoadingOutlined style={{ fontSize: 20 }} />;

  return <BaseChart options={options} />;
};

export default MiddleChart;
