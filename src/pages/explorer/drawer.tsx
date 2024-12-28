import { Input, Checkbox, List, Button } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { use } from "echarts/types/src/extension.js";
import { useImmer } from "use-immer";

const MyDrawer: React.FC = () => {
  const drawerWidth = 240; // Width of the drawer

  const tokens = [
    {
      name: "DOGE",
      description: "Department of Government",
      address: "0x1234",
    },
    { name: "PEPE", description: "Pepe", address: "0x1234" },
  ];
  const [columns, setColumn] = useImmer([]);

  const indicators = [
    { name: "HHI", description: "The hhi of token..." },
    { name: "AvgCost", description: "The average cost of token..." },
  ];

  const handleTokenChange = (e: CheckboxChangeEvent) => {
    console.log(
      `${e.target.value} is ${e.target.checked ? "selected" : "deselected"}`
    );
  };

  const handleIndicatorChange = (e: CheckboxChangeEvent) => {
    console.log(
      `${e.target.value} is ${e.target.checked ? "selected" : "deselected"}`
    );
  };
  return (
    <div>
      {/* <div>
            <h3>Token</h3>
                <Input.Search placeholder="Search token" style={{ marginBottom: "16px" }} />
                <List
                    dataSource={tokens}
                    renderItem={(token) => (
                    <List.Item>
                        <Checkbox value={token.name} onChange={handleTokenChange}>
                        {token.name} <span style={{ fontSize: "12px" }}>{token.description}</span>
                        </Checkbox>
                    </List.Item>
                    )}
                />
            </div> */}
      <div style={{ marginTop: "1px" }}>
        <h3>Choose Indicator</h3>
        <Input.Search
          placeholder="Search indicator"
          style={{ marginBottom: "16px" }}
        />
        <List
          dataSource={indicators}
          renderItem={(indicator) => (
            <List.Item>
              <Checkbox value={indicator.name} onChange={handleIndicatorChange}>
                {indicator.name}{" "}
                <span style={{ fontSize: "12px" }}>
                  {indicator.description}
                </span>
              </Checkbox>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
export default MyDrawer;
