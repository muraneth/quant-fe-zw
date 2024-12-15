import { useImmer } from "use-immer";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import Menu from "./menu";
import PersonalInfo from "./personal-info";
import { menuChangeEvent } from "@/utils/event";
import classNames from "classnames";
import styles from "./index.module.scss";

const Layout = () => {
  const [menuFold, setMenuFold] = useImmer<boolean>(false);

  const handleMenuFold = () => {
    setMenuFold(!menuFold);
    window.dispatchEvent(menuChangeEvent);
  };

  const jumpToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className={styles.layout}>
      <div className={classNames(styles.left, { [styles.menuFold]: menuFold })}>
        <div className={styles.title} onClick={jumpToHome}>
          {menuFold ? "M" : "MatrixCipher"}
        </div>
        <Menu menuFold={menuFold} />
        <div className={styles.leftBottom}>
          <PersonalInfo menuFold={menuFold} />
          <div className={styles.control} onClick={handleMenuFold}>
            {menuFold ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            <span className={styles.controlText}>
              {menuFold ? null : "menuFold"}
            </span>
          </div>
        </div>
      </div>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
