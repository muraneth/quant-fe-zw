import { UserOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { getUserInfo } from "@/utils/common";
import styles from "./index.module.scss";

const PersonalInfo = () => {
  const { username, pic_url } = getUserInfo();

  return (
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
  );
};

export default PersonalInfo;
