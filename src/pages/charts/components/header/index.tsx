import { useImmer } from "use-immer";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const Header = () => {
  const [coinList] = useImmer([
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
    { name: "4CHAN", icon: "" },
  ]);

  return (
    <div className={styles.header}>
      <div className={styles.coinsDisplay}>
        {(coinList || []).map((coinItem, index) => (
          <div className={styles.coinItem} key={index}>
            <img src={coinItem.icon} alt="" />
            <div>{coinItem.name}</div>
          </div>
        ))}
      </div>
      <Input
        className={styles.search}
        suffix={<SearchOutlined />}
        placeholder="search for coin name"
      />
    </div>
  );
};

export default Header;
