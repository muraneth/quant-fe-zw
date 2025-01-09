import { useRequest } from "ahooks";
import {
  collectIndicator,
  unCollectIndicator,
  getIndicatorList,
} from "@/service/charts";
import { useChartStore } from "@/store/charts";
import CollectItem from "@/components/common/colletct";
const ChartOperation = () => {
  const { symbol, chain } = useChartStore.use.tokenInfo();
  const { handle_name, collected } = useChartStore.use.indicatorInfo();
  const base_params = useChartStore.use.base_params();
  const extra_params = useChartStore.use.extra_params();
  const setDraftData = useChartStore.use.setDraftData();

  const { run: runGetIndicatorList } = useRequest(getIndicatorList, {
    manual: true,
    onSuccess: (res) => {
      setDraftData((draft) => {
        draft.indicatorList = res;
      });
    },
  });

  const { runAsync: runCollect, loading: collectLoading } = useRequest(
    collectIndicator,
    {
      manual: true,
      onSuccess: () => {
        setDraftData((draft) => {
          draft.indicatorInfo.collected = true;
        });
        runGetIndicatorList({ symbol, chain });
      },
      onError: (error) => {
        console.error("Failed to toggle collection status:", error);
      },
      refreshDeps: [symbol, chain]
    }
  );

  const { runAsync: runUncollect, loading: uncollectLoading } = useRequest(
    unCollectIndicator,
    {
      manual: true,
      onSuccess: () => {
        setDraftData((draft) => {
          draft.indicatorInfo.collected = false;
        });
        runGetIndicatorList({ symbol, chain });
      },
      onError: (error) => {
        console.error("Failed to toggle collection status:", error);
      },
      refreshDeps: [symbol, chain]
    }
  );

  const handleStarClick = () => {
    const params = {
      handle_name,
      base_params: JSON.stringify(base_params),
      extra_params: JSON.stringify(extra_params),
    };
    if (collected) {
      runUncollect(params);
    } else {
      runCollect(params);
    }
  };
  return (
    <CollectItem handleStarClick={handleStarClick} collected={collected} loading={collectLoading ||uncollectLoading} />
  )
};

export default ChartOperation;
