import styles from "./index.module.scss";
import UserTokenTable from "./user-table";
import TokenTable from "./global-table";
import React, { useState } from "react";
import { Layout, Drawer, Button } from "antd";
import MyDrawer from "./drawer";

const { Header, Content } = Layout;

const Explorer: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

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
          // marginLeft: isDrawerOpen ? drawerWidth : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Header className={styles.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h3>Subscribe user will get more than 100 token list</h3>
            <Button>Get Subscribed</Button>
          </div>
          <div></div>
        </Header>

        <Content
          style={{
            paddingLeft: "16px",
            paddingRight: "16px",
            height: "calc(100vh - 64px)", // Subtract header height
            overflow: "auto", // Enable content scrolling
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // minHeight: "100%",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={() => {
                  setDrawerOpen(!isDrawerOpen);
                }}
              >
                Set Indicator List
              </Button>
            </div>
            <UserTokenTable />
          </div>
          <div>
            <h3>Explore Token List</h3>
          </div>
          <div
            style={{
              marginBottom: "120px", // Add space for footer and pagination
              display: "flex",
              flexDirection: "column",
              minHeight: "100%",
            }}
          >
            <TokenTable />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Explorer;
