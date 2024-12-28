import FormRender, { useForm } from "form-render";
import CustomDatePicker from "@/components/custom-date-picker";

const schema = {
  type: "object",
  properties: {
    end_time: {
      type: "string",
      default: '2024-12-17',
      props: {
        title: "End Time",
        tooltip: "Specify the day range EndTime",
        required: true,
      },
      widget: "CustomDatePicker",
    },
    start_time: {
      type: "string",
      default: '2024-08-15',
      props: {
        title: "Start Time",
        tooltip: "Specify the day range StartTime",
        required: true,
      },
      widget: "CustomDatePicker",
    },
  },
  displayType: "inline",
};

export default function Home() {
  const form = useForm();

  const handleExtraChange = (allValues: Record<string, any>) => {
    console.log("schema all values:", allValues);
  };

  return (
    <div>
      <FormRender
        form={form}
        schema={schema}
        widgets={{ CustomDatePicker }}
        watch={{
          "#": (allValues) => {
            handleExtraChange(allValues);
          },
        }}
        style={{ marginLeft: 24 }}
      />
    </div>
  );
}
