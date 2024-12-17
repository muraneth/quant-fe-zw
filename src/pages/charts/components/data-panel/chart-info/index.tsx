import { Tooltip } from "antd";
import styles from "./index.module.scss";
import classNames from "classnames";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import { useChartStore } from "@/store/charts";
import {Divider} from "antd";
const ChartInfo = () => {
    const indicatorInfo = useChartStore.use.indicatorInfo();
     return (
      <div className={styles.topInfo}>
          <div className={styles.left}>
            
            <span
              className={classNames(styles.indicatorItemLevel, {
                [styles[`indicatorItemLevel${indicatorInfo.required_level }`]]: true,
              })} 
            >
              {`L${indicatorInfo.required_level  }`}
            </span>
            <span className={styles.title}>{indicatorInfo.name}</span>
            <Tooltip title={
              <div>
              {indicatorInfo.description}
              {indicatorInfo.doc && (
                <a 
                  href={indicatorInfo.doc} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ marginLeft: '8px', color: 'green' }}
                >
                  LearnMore
                </a>
              )}
            </div>
            } placement="right">
              <ExclamationCircleOutlined />
            </Tooltip>
          
          </div>
          {/* <Divider /> */}
        </div>
     )
}
export default ChartInfo;