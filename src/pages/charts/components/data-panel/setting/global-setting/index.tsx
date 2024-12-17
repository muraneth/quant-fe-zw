import React from 'react';
import ChartCalender from './calender';
import Wizard from './wizard';
import styles from './index.module.scss';

const ChartSetting: React.FC = () => {
  return (
      <div className={styles.componentWrapper}>
        <ChartCalender />
        <Wizard />
      </div>
  );
};

export default ChartSetting;