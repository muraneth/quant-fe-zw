import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Divider, Button,Layout } from "antd";
import PersonalInfo from "./personal-info";
import ErrorBoundary from "@/components/error-boundary";
import styles from "./index.module.scss";
import classNames from "classnames";
const { Footer } = Layout;
const homeMenuList = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "Studio",
    path: "https://studio.tokenalytic.com/explorer",
  },
  {
    name: "Document",
    path: "https://docs.tokenalytic.com",
  },
  {
    name: "Pricing",
    path: "/pricing",  
  },
];
const footerLinks = {
  company: [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ],
  resources: [
    { name: "Blog", path: "/blog" },
    { name: "Documentation", path: "https://docs.tokenalytic.com" },
  ]
};
const studioMenuList = [
  {
    name: "Explorer",
    path: "/explorer",
  },
  {
    name: "Studio",
    path: "/studio?tab=chart&symbol=MSTR&handle_name=holder.all&chain=ethereum",
  },
  {
    name: "Document",
    path: "https://docs.tokenalytic.com",
  },
  {
    name: "Pricing",
    path: "/pricing",
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
      <div className={styles.header}>
        <a className={styles.left} href="/home">
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
      <Divider style={{ margin: 0 }} />

      <Footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Tokenalytic</h3>
            <p>Empowering crypto analytics for everyone</p>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Company</h4>
            <div className={styles.footerLinks}>
              {footerLinks.company.map((link, index) => (
                <Link key={index} to={link.path}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Resources</h4>
            <div className={styles.footerLinks}>
              {footerLinks.resources.map((link, index) => (
                link.path.startsWith('http') ? (
                  <a key={index} href={link.path} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                ) : (
                  <Link key={index} to={link.path}>
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Connect With Us</h4>
            <div className={styles.footerSocial}>
              <a href="https://twitter.com/tokenalytic" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href="https://discord.gg/tokenalytic" target="_blank" rel="noopener noreferrer">
                Discord
              </a>
            </div>
          </div>
        </div>
        
        <Divider style={{ margin: '24px 0' }} />
        
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Tokenalytic. All rights reserved.</p>
        </div>
      </Footer>
    </div>
  );
};

export default MainLayout;
