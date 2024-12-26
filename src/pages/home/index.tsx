import FormRender, { useForm } from "form-render";
import CustomDatePicker from "@/components/custom-date-picker";

const schema = {
  type: "object",
  displayType: "inline",
  // column: 2,
  properties: {
    startTime: {
      type: "string",
      widget: "CustomDatePicker",
      props: {
        title: "Start Time",
        default_value: "2022-04-17",
        tooltip:
          "Specify the day before the day you want to get the average cost of wallets",
        required: true,
      },
    },
    endTime: {
      type: "string",
      widget: "CustomDatePicker",
      props: {
        title: "End Time",
        default_value: "2023-04-17",
      },
    },
    start_time: {
      type: "string",
      props: {
        title: "Date",
        tooltip:
          "Specify the day before the day you want to get the average cost of wallets",
        required: true,
        defaultv_value: "2024-04-17",
      },
      widget: "CustomDatePicker",
    },
  },
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
