import UserTokenTable from "./user-table";
import TokenTable from "./global-table";
import React, { useState } from "react";
import { Layout, Drawer, Button, Tabs } from "antd";
import MyDrawer from "./drawer";
import styles from "./index.module.scss";
const { Content,Header } = Layout;
import { getUserInfo } from "@/utils/common";

const Explorer: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const userInfo = getUserInfo();
  const items = [
    
    {
      key: "1",
      label: "Explore All",
      children: (
        <div
          style={{
            marginBottom: "120px",
            // marginTop: "20px",
          }}
        >
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
            {!userInfo||userInfo.level<=2 ? (
              <>
               <span>Advance Subscribe user will get more tokens and more indicators to watch </span>
                <a type="primary" href="/pricing">
                  upgrade plan
                </a>
              </>
            ):null
          }
          </div>
            <Button onClick={() => setDrawerOpen(!isDrawerOpen)}>
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
            // height: "calc(100vh - 6px)",
            overflow: "auto",
          }}
        >
          <Tabs
            defaultActiveKey="1"
            items={items}
            size="large"
            // style={{ marginTop: "20px" }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Explorer;
