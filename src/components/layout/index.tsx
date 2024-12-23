import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Divider, Button } from "antd";
import PersonalInfo from "./personal-info";
import ErrorBoundary from "@/components/error-boundary";
import styles from "./index.module.scss";

const menuList = [
  {
    name: "Explorer",
    path: "/explorer",
  },
  {
    name: "Chart",
    path: "/charts",
  },
  {
    name: "Document",
    path: "https://www.google.com",
  },
  {
    name: "Pricing",
    path: "/priceing",
  },
];

const Layout = () => {
  const location = useLocation();
  const landingPage = location.pathname === "/landing";

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <a className={styles.left} href="/landing">
          Tokenalytic
        </a>
        <div className={styles.menu}>
          {menuList.map((item, index) => {
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
              <Link className={styles.menuItem} key={index} to={item.path}>
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
