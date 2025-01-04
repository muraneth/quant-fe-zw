import { Divider, Tabs } from "antd";
import type { TabsProps } from "antd";
import Chart from "./chart";
import Header from "./header";
import styles from "./index.module.scss";
import Wallets from "./wallet";
import { useSearchParams } from "react-router-dom";

const items: TabsProps["items"] = [
  {
    key: "chart",
    label: "CHART",
    children: <Chart />,
  },
  {
    key: "wallet",
    label: "WALLET",
    children: <Wallets />,
  },
];

const Studio = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleTabChange = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("tab", key);

    if (key === "chart") {
      newSearchParams.delete("wallet_address");
      // newSearchParams.set("handle_name", "holer.all");
    }
    setSearchParams(newSearchParams);
  };
  const tab = (searchParams.get("tab") || "chart").toLowerCase();

  return (
    <div className={styles.studio}>
      <Header />
      <Divider style={{ margin: 0 }} />
      <Tabs
        type="line"
        defaultActiveKey="chart"
        activeKey={tab}
        items={items}
        onChange={handleTabChange}
      />
    </div>
  );
};

export default Studio;
