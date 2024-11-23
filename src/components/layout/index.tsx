import { Outlet } from "react-router-dom";
import Menu from './menu';
import styles from "./index.module.scss";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        <div className={styles.title}>MatrixCipher</div>
        <Menu />
      </div>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
