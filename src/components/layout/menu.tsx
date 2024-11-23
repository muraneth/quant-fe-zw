import { Link } from "react-router-dom";
import { menuItems } from './constant';
import styles from "./index.module.scss";


const Menu = () => {
  return (
    <div className={styles.menu}>
      {menuItems.map((item, index) => {
        // 选中某一个之后，添加 active 的类名，然后 icon 命中 activeIcon, title color 变为对应的蓝色
        return (
          <Link key={index} to={item.path}>
            <div className={styles.menuItem}>
              {item.icon}
              <span className={styles.menuLabel}>{item.label}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
