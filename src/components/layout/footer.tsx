
import { Divider,  Layout } from "antd";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

const { Footer } = Layout;

const footerLinks = {
    company: [
      { name: "About Us", path: "https://tokenalytic.com/about" },
      { name: "Contact", path: "https://tokenalytic.com/contact" },
    ],
    resources: [
      { name: "Video", path: "https://www.youtube.com/channel/UC6Dxbq79XoCv14vlvI2TdWg" },
      { name: "Documentation", path: "https://docs.tokenalytic.com" },
      { name: "Pricing", path: "https://tokenalytic.com/pricing" },
    ],
  };
const MyFooter = () => {
    return (
        <Footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Tokenalytic</h3>
            <p>Empowering crypto analytics for everyone</p>
          </div>

          {/* <div className={styles.footerSection}>
            <h4>Company</h4>
            <div className={styles.footerLinks}>
              {footerLinks.company.map((link, index) => (
                <Link key={index} to={link.path}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div> */}

          <div className={styles.footerSection}>
            <h4>Resources</h4>
            <div className={styles.footerLinks}>
              {footerLinks.resources.map((link, index) =>
                link.path.startsWith("http") ? (
                  <a
                    key={index}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link key={index} to={link.path}>
                    {link.name}
                  </Link>
                )
              )}
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4>Connect with me</h4>
            <div className={styles.footerSocial}>
              <a
                href="https://x.com/muran_eth"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
              <a
                href="https://t.me/mura202211"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
            </div>
          </div>
        </div>

        <Divider style={{ margin: "24px 0" }} />

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Tokenalytic. All rights reserved.</p>
        </div>
      </Footer>
    );
}
export default MyFooter;