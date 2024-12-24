import { Tooltip } from "antd";
import classNames from "classnames";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useChartStore } from "@/store/charts";
import styles from "./index.module.scss";
import ChartOperation from "./operation";
const ChartInfo = () => {
  const indicatorInfo = useChartStore.use.indicatorInfo();

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
        <Tooltip
          title={
            <div>
              {indicatorInfo.description}
              {indicatorInfo.doc && (
                <a
                  href={indicatorInfo.doc}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: "8px", color: "green" }}
                >
                  LearnMore
                </a>
              )}
            </div>
          }
          placement="right"
        >
          <QuestionCircleOutlined />
        </Tooltip>
      </div>
      <div>
        <ChartOperation />
      </div>
    </div>
  );
};

export default ChartInfo;
