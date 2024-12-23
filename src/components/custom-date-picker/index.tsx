import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import MuiHOC from "@/components/mui-hoc";
import type { WidgetProps } from "form-render";
import styles from "./index.module.scss";
import {QuestionCircleOutlined } from "@ant-design/icons";
import {Tooltip} from "antd";




const CustomDatePicker = (props: WidgetProps) => {
  const { title, value, default_value, tooltip, onChange } = props;


  const selectedDate = value ? dayjs(value) : dayjs(default_value)

  const handleChange = (e: dayjs.Dayjs | null) => {
    if (e) {
      const formatTime = dayjs(e).format("YYYY-MM-DD");
      onChange(formatTime);
    }
  };

  return (
    <MuiHOC>
      <div style={{ marginTop: 5, display: "flex" }}>
        {tooltip && (
          <Tooltip title={tooltip}>
            <QuestionCircleOutlined />
          </Tooltip>
        )}
        <div className={styles.customDatePicker}>
          <DatePicker
            label={title}
            value={selectedDate}
            onChange={handleChange}
            slotProps={{
              popper: {
                sx: {
                  "& .MuiDateCalendar-root": {
                    zoom: 0.8,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </MuiHOC>
  );
};

export default CustomDatePicker;