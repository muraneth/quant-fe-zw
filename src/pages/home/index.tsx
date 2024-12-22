import FormRender, { useForm } from "form-render";
import CustomDatePicker from "@/components/custom-date-picker";

const schema = {
  type: "object",
  displayType: "inline",
  column: 2,
  properties: {
    startTime: {
      type: "string",
      widget: "CustomDatePicker",
      props: {
        title: "Start Time",
        defaultValue: "2022-04-17",
      },
    },
    endTime: {
      type: "string",
      widget: "CustomDatePicker",
      props: {
        title: "End Time",
        defaultValue: "2023-04-17",
      },
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
