import { Tooltip } from "antd";
import classNames from "classnames";

import { useChartStore } from "@/store/charts";
import styles from "./index.module.scss";
import ChartOperation from "./operation";
const ChartInfo = () => {
  const indicatorInfo = useChartStore.use.indicatorInfo();
  const renderDescription = (description:string) => {
    const words = description.split(" ");
    const isTruncated = words.length > 10;
    const truncatedDescription = isTruncated
      ? `${words.slice(0, 10).join(" ")}...`
      : description;

    return (
      <Tooltip title={description}>
        <span style={{ color: "#f5f5f5", fontWeight: "normal" }}>{truncatedDescription}</span>
      </Tooltip>
    );
  };
  return (
    <div className={styles.topInfo}>
      <div className={styles.info}>
        <span
          className={classNames(styles.indicatorItemLevel, {
            [styles[`indicatorItemLevel${indicatorInfo.required_level - 1}`]]:
              true,
          })}
        >
          {`L${indicatorInfo.required_level - 1}`}
        </span>
        <span className={styles.title}>{indicatorInfo.name}</span>
      
            <div>
              {renderDescription(indicatorInfo.description)}
              {indicatorInfo.doc && (
                <a
                  href={indicatorInfo.doc}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: "8px", color: "green",borderBottom: "1px solid green" }}
                >
                  LearnMore
                </a>
              )}
            </div>

         
      </div>
      <div>
        <ChartOperation />
      </div>
    </div>
  );
};

export default ChartInfo;
