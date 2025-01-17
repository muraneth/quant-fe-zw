import { UserOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { getUserInfo } from "@/utils/common";
import styles from "./index.module.scss";
import { Button } from "antd";

const PersonalInfo = () => {
  const { username, pic_url, level } = getUserInfo();

  return (
    <div className={styles.rightConer}>
      <div>
        {(!level || level < 4) && (
          <Button
            type="primary"
            size="small"
            href="/pricing"
            className={styles.upgradeButton}
          >
            Upgrade Plan
          </Button>
        )}
      </div>

      <div className={styles.personalInfo}>
        <div className={classNames(styles.name, ["common-ellipsis-1"])}>
          {username}
        </div>
        {pic_url ? (
          <img className={styles.avatar} src={pic_url} alt="" />
        ) : (
          <UserOutlined className={styles.avatar} />
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
