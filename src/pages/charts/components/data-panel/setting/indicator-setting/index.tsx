import React from 'react';
import styles from './index.module.scss';
import IndicatorParam from './indicator-param';
const ChartSetting: React.FC = () => {
  return (

      <div className={styles.componentWrapper}>
        <IndicatorParam />
      </div>

  );
};

export default ChartSetting;