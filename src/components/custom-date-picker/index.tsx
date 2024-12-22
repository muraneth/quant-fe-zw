import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import MuiHOC from "@/components/mui-hoc";
import type { WidgetProps } from "form-render";
import styles from "./index.module.scss";

const CustomDatePicker = (props: WidgetProps) => {
  const { title, value, defaultValue, onChange } = props;
  // console.log('custom widget props:', props);

  const handleChange = (e: dayjs.Dayjs | null) => {
    const formatTime = dayjs(e).format("YYYY-MM-DD");
    onChange(formatTime);
  };

  return (
    <MuiHOC>
      <div style={{ marginTop: 50, display: "flex" }}>
        <div className={styles.customDatePicker}>
          <DatePicker
            label={title}
            defaultValue={dayjs(defaultValue)}
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
          />
        </div>
      </div>
    </MuiHOC>
  );
};

export default CustomDatePicker;
