import React from 'react';
import { useImmer } from "use-immer";
import { DatePicker, Dropdown, Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'; // Import dayjs for date formatting
import styles from './index.module.scss';
import { useChartStore } from "@/store/charts";


const { RangePicker } = DatePicker;

const CalendarComponent: React.FC = () => {
  const [open, setOpen] = useImmer(false);
  const setTokenInfo = useChartStore.use.setTokenInfo();
  const tokenInfo = useChartStore.use.tokenInfo();
  // Control dropdown visibility
  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };

  // Handle date range selection
  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    console.log('dateStrings', dateStrings,"dates",dates);
    if (dates && dateStrings[0] && dateStrings[1]) {
      const start_time = dayjs(dateStrings[0]).format('YYYY-MM-DD HH:mm:ss');
      const end_time = dayjs(dateStrings[1]).format('YYYY-MM-DD HH:mm:ss');

      setTokenInfo({ 
        ...tokenInfo, 
        start_time, 
        end_time 
      });
    }
  };

  // Render the DatePicker popup
  const dropdownContent = (
    <div className={styles.datePickerContainer}>
      <RangePicker 
        showTime
        format="YYYY-MM-DD HH:mm:ss" 
        onChange={handleDateChange} 
      />
    </div>
  );

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarOptions}>
        {/* Other Calendar Options */}
        <span className={styles.calendarOption}>1M</span>
        <span className={styles.calendarOption}>1Y</span>
        <span className={styles.calendarOption}>YTD</span>
        <span className={styles.calendarOption}>All</span>

        {/* Calendar Icon with DatePicker */}
        <Dropdown
          overlay={dropdownContent}
          trigger={['click']}
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Button
            icon={<CalendarOutlined />}
            className={styles.calendarIcon}
            type="text"
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default CalendarComponent;