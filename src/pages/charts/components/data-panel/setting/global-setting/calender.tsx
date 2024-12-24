import React from "react";
import { useImmer } from "use-immer";
import { DatePicker, Dropdown, Button } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import styles from "./index.module.scss";
import { useChartStore } from "@/store/charts";

const { RangePicker } = DatePicker;

const CalendarComponent: React.FC = () => {
  const [open, setOpen] = useImmer(false);
  const setDraftData = useChartStore.use.setDraftData();

  // Control dropdown visibility
  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };

  // Handle date range selection
  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dates && dateStrings[0] && dateStrings[1]) {
      const start_time = dayjs(dateStrings[0]).format("YYYY-MM-DD HH:mm:ss");
      const end_time = dayjs(dateStrings[1]).format("YYYY-MM-DD HH:mm:ss");
      setDraftData((draft) => {
        draft.tokenInfo.start_time = start_time;
        draft.tokenInfo.end_time = end_time;
      });
    }
  };

  // Handle preset time options
  const setPresetTime = (option: string) => {
    let start_time = "";
    let end_time = dayjs().format("YYYY-MM-DD HH:mm:ss");

    switch (option) {
      case "1M":
        start_time = dayjs().subtract(1, "month").format("YYYY-MM-DD 00:00:00");
        break;
      case "1Y":
        start_time = dayjs().subtract(1, "year").format("YYYY-MM-DD 00:00:00");
        break;
      case "YTD":
        start_time = dayjs().startOf("year").format("YYYY-MM-DD 00:00:00");
        break;
      case "All":
        start_time = "";
        end_time = "";
        break;
      default:
        break;
    }

    setDraftData((draft) => {
      draft.tokenInfo.start_time = start_time;
      draft.tokenInfo.end_time = end_time;
    });
  };

  // Render the DatePicker popup
  const dropdownContent = (
    <div className={styles.datePickerContainer}>
      <RangePicker
        // showTime
        // format="YYYY-MM-DD HH:mm:ss"
        onChange={handleDateChange}
      />
    </div>
  );

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarOptions}>
        {/* Preset Calendar Options */}
        <span
          className={styles.calendarOption}
          onClick={() => setPresetTime("1M")}
        >
          1M
        </span>
        <span
          className={styles.calendarOption}
          onClick={() => setPresetTime("1Y")}
        >
          1Y
        </span>
        <span
          className={styles.calendarOption}
          onClick={() => setPresetTime("YTD")}
        >
          YTD
        </span>
        <span
          className={styles.calendarOption}
          onClick={() => setPresetTime("All")}
        >
          All
        </span>

        {/* Calendar Icon with DatePicker */}
        <Dropdown
          overlay={dropdownContent}
          trigger={["click"]}
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
