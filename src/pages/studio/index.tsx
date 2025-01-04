import { Divider, Tabs } from "antd";
import type { TabsProps } from "antd";
import Chart from "./chart";
import Header from "./header";
import styles from "./index.module.scss";

const items: TabsProps["items"] = [
  {
    key: "CHART",
    label: "CHART",
    children: <Chart />,
  },
  {
    key: "WALLET",
    label: "WALLET",
    children: "WALLET",
  },
  {
    key: "COMPOSE",
    label: "COMPOSE",
    children: "COMPOSE",
  },
  {
    key: "TRADINGVIEW",
    label: "TRADINGVIEW",
    children: "TRADINGVIEW",
  },
];

const Studio = () => {
  return (
    <div className={styles.studio}>
      <Header />
      <Divider style={{ margin: 0 }} />
      <Tabs
        type="line"
        defaultActiveKey="CHART"
        items={items}
      />
    </div>
  );
};

export default Studio;
