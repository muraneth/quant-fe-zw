import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import MuiHOC from "@/components/mui-hoc";
import type { WidgetProps } from "form-render";
import styles from "./index.module.scss";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const CustomDatePicker = (props: WidgetProps) => {
  const { title, value, tooltip, onChange } = props;

  const handleChange = (e: dayjs.Dayjs | null) => {
    if (e) {
      const formatTime = dayjs(e).format("YYYY-MM-DD");
      console.log("formatTime on change", formatTime);

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
            value={dayjs(value)}
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
            sx={{
              "& .MuiOutlinedInput-input": {
                padding: "8px 14px",
              },
            }}
          />
        </div>
      </div>
    </MuiHOC>
  );
};

export default CustomDatePicker;
