import { useImmer } from "use-immer";
import { Link } from "react-router-dom";
import { menuItems, MenuKey } from "./constant";
import classNames from "classnames";
import styles from "./index.module.scss";
import React from "react";

interface MenuProps {
  menuFold: boolean;
}

const Menu: React.FC<MenuProps> = ({ menuFold }) => {
  const [curMenu, setCurMenu] = useImmer<MenuKey>(MenuKey.HOME);

  const changeMenu = (menuKey: MenuKey) => {
    setCurMenu(menuKey);
  };

  return (
    <div className={styles.menu}>
      {menuItems.map((item) => {
        const active = item.key === curMenu;
        return (
          <Link key={item.key} to={item.path}>
            <div
              className={classNames(styles.menuItem, {
                [styles.menuActive]: active,
              })}
              onClick={() => changeMenu(item.key)}
            >
              <div className={styles.menuIcon}>{active ? item.activeIcon : item.icon}</div>
              {menuFold ? null : (
                <span className={styles.menuLabel}>{item.label}</span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
