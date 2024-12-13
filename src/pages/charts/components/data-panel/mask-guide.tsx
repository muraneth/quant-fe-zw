import { Button } from "antd";
import { svgMap } from "@/constants/svg";
import styles from "./index.module.scss";

const MaskGuide = () => {
  const toSubscribePage = () => {
    window.location.href = "/subscribe";
  };

  return (
    <div className={styles.maskGuide}>
      <div className={styles.content}>
        {svgMap["lock"]}
        <span className={styles.text}>when to buy token?</span>
        <span className={styles.text}>When to sell ?</span>
        <span className={styles.text}>
          Find out the best timing to by token
        </span>
        <Button
          className={styles.upgradeBtn}
          type="primary"
          onClick={toSubscribePage}
        >
          <span className={styles.upgradeBtnText}>Upgrade Now</span>
        </Button>
        <span className={styles.text}>
          Get access to unique indicator that no where else provide
        </span>
      </div>
    </div>
  );
};

export default MaskGuide;
