import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { useImmer } from "use-immer";
import { collectIndicator, unCollectIndicator } from "@/service/charts";
import { useChartStore } from "@/store/charts";
import { useEffect } from "react";
const ChartOperation = () => {
    const { handle_name,collected } = useChartStore.use.indicatorInfo();
    const [isStarred, setIsStarred] = useImmer(false);

    const base_params = useChartStore.use.base_params();
    const extra_params = useChartStore.use.extra_params();
    useEffect(() => {
        if (collected) {
            setIsStarred(true);
            }else {
            setIsStarred(false);
        }
    }, [handle_name,collected]);
    const { runAsync: runCollect, loading: collectLoading } = useRequest(
        () => collectIndicator({
            handle_name,
            base_params: JSON.stringify(base_params),
            extra_params: JSON.stringify(extra_params),
        }), 
        { manual: true }
    );

    const { runAsync: runUncollect, loading: uncollectLoading } = useRequest(
        () => unCollectIndicator({
            handle_name,
            base_params: JSON.stringify(base_params),
            extra_params: JSON.stringify(extra_params),
        }), 
        { manual: true }
    );

    const handleStarClick = async () => {
        try {
            if (isStarred) {
                await runUncollect();
                setIsStarred(false);
            } else {
                await runCollect();
                setIsStarred(true);
            }
        } catch (error) {
            console.error('Failed to toggle collection status:', error);
            // Optionally add error handling here (e.g., showing a notification)
        }
    };

    return (
        <div 
            onClick={handleStarClick}
            style={{ cursor: collectLoading || uncollectLoading ? 'wait' : 'pointer', padding: "8px" }}
        >
            {isStarred ? (
                <StarFilled 
                    style={{ 
                        color: "#fadb14",
                        opacity: collectLoading || uncollectLoading ? 0.5 : 1 
                    }} 
                />
            ) : (
                <StarOutlined 
                    style={{ 
                        opacity: collectLoading || uncollectLoading ? 0.5 : 1 
                    }} 
                />
            )}
        </div>
    );
};

export default ChartOperation;