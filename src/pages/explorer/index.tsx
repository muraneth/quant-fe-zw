import styles from "./index.module.scss";
import UserTokenTable from "./user-table";
import TokenTable from "./global-table";
import React, { useState } from "react";
import { Layout, Drawer, Button, Divider } from "antd";
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
            <Button type="primary"  href="/pricing" >Get Subscribed</Button>
          </div>
          <div></div>
        </Header>

        <Content
          style={{
            paddingLeft: "16px",
            paddingRight: "16px",
            height: "calc(100vh - 64px)",
            overflow: "auto", // Enable content scrolling
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",

            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between",alignItems:"center" }}>
              <div>
                <h2>My Watch List</h2>
              </div>
              <div >
              <Button
                onClick={() => {
                  setDrawerOpen(!isDrawerOpen);
                }}
              >
                Set Indicator
              </Button>
              </div>
          </div>
          <UserTokenTable />
          </div>
          <Divider />
          <div>
            <h3>Explore Token List</h3>
          </div>
          <div
            style={{
              marginLeft:"50px",
              marginRight:"50px",
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
