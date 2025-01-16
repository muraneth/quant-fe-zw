import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Divider, Button } from "antd";
import PersonalInfo from "./personal-info";
import ErrorBoundary from "@/components/error-boundary";
import styles from "./index.module.scss";
import classNames from "classnames";
import MyFooter from "./footer";
const homeMenuList = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "Studio",
    path: "https://studio.tokenalytic.com/studio?tab=chart&symbol=NPC&handle_name=holder.all&chain=ethereum",
  },
  {
    name: "Docs",
    path: "https://docs.tokenalytic.com",
  },
  {
    name: "Video",
    path: "https://www.youtube.com/channel/UC6Dxbq79XoCv14vlvI2TdWg",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
];
const studioMenuList = [
  // {
  //   name: "Explorer",
  //   path: "/explorer",
  // },
  {
    name: "Studio",
    path: "/studio?tab=chart&symbol=NPC&handle_name=holder.all&chain=ethereum",
  },
  {
    name: "Docs",
    path: "https://docs.tokenalytic.com",
  },
  {
    name: "Video",
    path: "https://www.youtube.com/channel/UC6Dxbq79XoCv14vlvI2TdWg",
  },
];

const MainLayout = () => {
  const location = useLocation();
  const { pathname } = location;
  const landingPage = pathname === "/home";

  const getMenuList = () => {
    const domain = window.location.hostname;
    switch (domain) {
      case "tokenalytic.com":
        return homeMenuList;
      case "studio.tokenalytic.com":
        return studioMenuList;
      default:
        return studioMenuList;
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <a className={styles.left} href="https://tokenalytic.com/home">
            Tokenalytic
          </a>
          <div className={styles.menu}>
            {getMenuList().map((item, index) => {
              const activePath = pathname === `/${item.name}`.toLowerCase();
              const outsidePath = item.path.startsWith("http");
              if (outsidePath) {
                return (
                  <a
                    className={styles.menuItem}
                    key={index}
                    href={item.path}
                    target="_blank"
                  >
                    {item.name}
                  </a>
                );
              }
              return (
                <Link
                  className={classNames(styles.menuItem, {
                    [styles.menuItemActive]: activePath,
                  })}
                  key={index}
                  to={item.path}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          {landingPage ? (
            <div className={styles.right}>
              <Button
                type="primary"
                href="https://studio.tokenalytic.com/studio?tab=chart&symbol=NPC&handle_name=holder.all&chain=ethereum"
              >
                Explore
              </Button>
            </div>
          ) : (

            <PersonalInfo />

          )}
        </div>
        <Divider style={{ margin: 0 }} />
      </div>

      <main className={styles.main}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Divider style={{ margin: 0 }} />
      <MyFooter />
      
    </div>
  );
};

export default MainLayout;
