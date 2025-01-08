import React, { useState } from "react";
import { Layout, Drawer, Button, Tabs } from "antd";
import UserTokenTable from "./user-table";
import TokenTable from "./global-table";
import MyDrawer from "./drawer";
import { getUserInfo } from "@/utils/common";
import styles from "./index.module.scss";

const { Content } = Layout;

const Explorer: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const userInfo = getUserInfo();
  
  const defaultActiveKey = userInfo&&userInfo.uid ? "2" : "1";

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
                  <span>Advance Subscribe user will get more tokens and more indicators to watch</span>
                  <a href="/pricing">upgrade plan</a>
                </>
              )}
            </div>
            <Button onClick={() => setDrawerOpen(true)}>
              Set Indicator
            </Button>
          </div>
          <UserTokenTable />
        </div>
      ),
    }
  ];

  return (
    <Layout className={styles.layout}>
      <Drawer
        title="Explorer Setting"
        placement="right"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MyDrawer />
      </Drawer>
      <Layout className={styles.layout}>
        <Content
          style={{
            paddingLeft: "16px",
            paddingRight: "16px",
            overflow: "auto",
          }}
        >
          <Tabs
            defaultActiveKey={defaultActiveKey}
            items={items}
            size="large"
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Explorer;