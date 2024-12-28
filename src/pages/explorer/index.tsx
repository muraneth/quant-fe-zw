import styles from "./index.module.scss";
import classNames from "classnames";

import TokenTable from "./table";
import React, { useState } from "react";
import { Layout, Drawer, Button } from "antd";
import MyDrawer from "./drawer";
const { Header, Content } = Layout;

const Explorer: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <Layout style={{ height: "100vh", transition: "margin-left 0.3s ease" }}>
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
          // marginLeft: isDrawerOpen ? drawerWidth : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Header className={styles.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h3>Subscribe user will get all token list</h3>
            <Button>Get Subscribed</Button>
          </div>
          <div>
            <Button
              onClick={() => {
                setDrawerOpen(!isDrawerOpen);
              }}
            >
              Set Indicator List
            </Button>
          </div>
        </Header>

        <Content style={{ padding: "16px" }}>
          <TokenTable />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Explorer;
