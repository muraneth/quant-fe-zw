import React from "react";
import { useImmer } from "use-immer";
import { DatePicker, Dropdown, Button } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import styles from "./index.module.scss";
import { useChartStore } from "@/store/charts";
import { getUserInfo } from "@/utils/common";
import AlertModal,{AlertType} from "@/components/common/alter-model";

const { RangePicker } = DatePicker;

const CalendarComponent: React.FC = () => {
  const [open, setOpen] = useImmer(false);
  const [selectedPreset, setSelectedPreset] = useImmer("3M"); // State to track selected option
  const tokenInfo = useChartStore.use.tokenInfo();
  const setDraftData = useChartStore.use.setDraftData();
  const userInfo = getUserInfo();
  const [alertVisible, setAlertVisible] = useImmer(false);
  const [alertType, setAlertType] = useImmer<AlertType>("upgrade");
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
        draft.selectedTimeRange.start_time = start_time;
        draft.selectedTimeRange.end_time = end_time;
      });
      setSelectedPreset(""); // Reset selected preset when custom range is chosen
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
      case "3M":
        start_time = dayjs().subtract(3, "month").format("YYYY-MM-DD 00:00:00");
        break;
      case "1Y":
        if (!userInfo.uid) {
          setAlertType("login");
          setAlertVisible(true);
          return;
        }
        if (!userInfo.level || userInfo.level < 2) {
          setAlertType("upgrade");
          setAlertVisible(true);
          return; 
        }
        start_time = dayjs().subtract(1, "year").format("YYYY-MM-DD 00:00:00");
        break;
      case "YTD":
        start_time = dayjs().startOf("year").format("YYYY-MM-DD 00:00:00");
        break;
      case "All":
        if (!userInfo.uid) {
          setAlertType("login");
          setAlertVisible(true);
          return;
        }
        if (!userInfo.level || userInfo.level < 3) {
          setAlertType("upgrade");
          setAlertVisible(true);
          return; // Do not set the time range if level is insufficient
        }
        start_time = tokenInfo.create_time;
        break;
      default:
        start_time = dayjs().subtract(3, "month").format("YYYY-MM-DD 00:00:00");
        break;
    }

    setDraftData((draft) => {
      draft.selectedTimeRange.start_time = start_time;
      draft.selectedTimeRange.end_time = end_time;
    });
    setSelectedPreset(option); // Highlight the selected option
  };

  // Render the DatePicker popup
  const dropdownContent = (
    <div className={styles.datePickerContainer}>
      <RangePicker onChange={handleDateChange} />
    </div>
  );

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarOptions}>
        {/* Preset Calendar Options */}
        {["1M", "3M", "1Y", "YTD", "All"].map((option) => (
          <span
            key={option}
            className={`${styles.calendarOption} ${
              selectedPreset === option ? styles.selected : ""
            }`}
            onClick={() => setPresetTime(option)}
          >
            {option}
          </span>
        ))}

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
      <AlertModal
        type={alertType}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
    </div>
  );
};

export default CalendarComponent;
