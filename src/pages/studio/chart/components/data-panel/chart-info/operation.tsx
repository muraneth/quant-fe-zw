import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
  collectIndicator,
  unCollectIndicator,
  getIndicatorList,
} from "@/service/charts";
import { useChartStore } from "@/store/charts";

const ChartOperation = () => {
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
        runGetIndicatorList();
      },
      onError: (error) => {
        console.error("Failed to toggle collection status:", error);
      },
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
        runGetIndicatorList();
      },
      onError: (error) => {
        console.error("Failed to toggle collection status:", error);
      },
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
    <div
      onClick={handleStarClick}
      style={{
        cursor: collectLoading || uncollectLoading ? "wait" : "pointer",
        padding: "8px",
      }}
    >
      {collected ? (
        <StarFilled
          style={{
            color: "#fadb14",
            opacity: collectLoading || uncollectLoading ? 0.5 : 1,
          }}
        />
      ) : (
        <StarOutlined
          style={{
            opacity: collectLoading || uncollectLoading ? 0.5 : 1,
          }}
        />
      )}
    </div>
  );
};

export default ChartOperation;
