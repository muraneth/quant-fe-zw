import styles from "./index.module.scss";
import UserTokenTable from "./user-table";
import TokenTable from "./global-table";
import React, { useState } from "react";
import { Layout, Drawer, Button, Tabs } from "antd";
import MyDrawer from "./drawer";

const { Header, Content } = Layout;

const Explorer: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const items = [
    {
      key: "1",
      label: "My Watch List",
      children: (
        <div style={{ marginTop: "1px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "5px",
            }}
          >
            <Button onClick={() => setDrawerOpen(!isDrawerOpen)}>
              Set Indicator
            </Button>
          </div>
          <UserTokenTable />
        </div>
      ),
    },
    {
      key: "2",
      label: "Explore All",
      children: (
        <div
          style={{
            marginBottom: "120px",
            marginTop: "20px",
          }}
        >
          <TokenTable />
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Drawer
        title="Explorer Setting"
        placement="right"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MyDrawer />
      </Drawer>

      <Layout
        style={{
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* <Header className={styles.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h3>Subscribe user will get more than 100 token list</h3>
            <Button type="primary" href="/pricing">
              Get Subscribed
            </Button>
          </div>
          <div></div>
        </Header> */}

        <Content
          style={{
            padding: "16px",
            // height: "calc(100vh - 6px)",
            overflow: "auto",
          }}
        >
          <Tabs
            defaultActiveKey="1"
            items={items}
            size="large"
            style={{ marginTop: "20px" }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Explorer;
