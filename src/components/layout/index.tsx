import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Divider, Button } from "antd";
import PersonalInfo from "./personal-info";
import ErrorBoundary from "@/components/error-boundary";
import styles from "./index.module.scss";
import classNames from "classnames";

const homeMenuList = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "Alytic",
    path: "/studio",
  },
  {
    name: "Document",
    path: "https://doc.tokenalytic.com",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
];

const studioMenuList = [
  {
    name: "Explorer",
    path: "/explorer",
  },
  {
    name: "Studio",
    path: "/studio?symbol=MSTR&handle_name=holder.all&type=independent_line&chain=ethereum",
  },
  {
    name: "Document",
    path: "https://doc.tokenalytic.com",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
];

const Layout = () => {
  const location = useLocation();
  const { pathname } = location;
  const landingPage = pathname === "/landing";

  const getMenuList = () => {
    const domain = window.location.hostname;
    switch (domain) {
      case "tokenalytic.com":
        return homeMenuList;
      case "app.tokenalytic.com":
        return studioMenuList;
      default:
        return studioMenuList;
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <a className={styles.left} href="/landing">
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
            <Button type="primary" href="/explorer">
              Explore
            </Button>
          </div>
        ) : (
          <PersonalInfo />
        )}
      </div>
      <Divider style={{ margin: 0 }} />
      <main className={styles.main}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default Layout;
