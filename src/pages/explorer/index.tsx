import React, { useState } from "react";
import { Layout, Drawer, Button, Tabs } from "antd";
import type { TabsProps } from "antd";
import UserTokenTable from "./user-table";
import TokenTable from "./global-table";
import MyDrawer from "./drawer";
import { getUserInfo } from "@/utils/common";
import StickyBox from "react-sticky-box";
import styles from "./index.module.scss";

const { Content } = Layout;

const Explorer: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const userInfo = getUserInfo();

  const defaultActiveKey = userInfo && userInfo.uid ? "2" : "1";

  const items = [
    {
      key: "1",
      label: "Explore All",
      children: (
        <div style={{ marginBottom: "120px" }}>
          <TokenTable />
        </div>
      ),
    },
    {
      key: "2",
      label: "My Watch List",
      children: (
        <div style={{ marginTop: "1px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "5px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {(!userInfo || userInfo.level <= 2) && (
                <>
                  <span>
                    Advance Subscribe user will get more tokens and more
                    indicators to watch
                  </span>
                  <a href="/pricing">upgrade plan</a>
                </>
              )}
            </div>
            <Button onClick={() => setDrawerOpen(true)}>Set Indicator</Button>
          </div>
          <UserTokenTable />
        </div>
      ),
    },
  ];

  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => (
    <StickyBox
      offsetTop={0}
      offsetBottom={0}
      style={{ zIndex: 999, background: "#090912" }}
    >
      <DefaultTabBar {...props} />
    </StickyBox>
  );

  return (
    <div className={styles.explorer}>
      <Drawer
        title="Explorer Setting"
        placement="right"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MyDrawer />
      </Drawer>
      <Content
        style={{
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <Tabs
          defaultActiveKey={defaultActiveKey}
          items={items}
          size="large"
          renderTabBar={renderTabBar}
        />
      </Content>
    </div>
  );
};

export default Explorer;
