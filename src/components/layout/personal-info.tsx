import { UserOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { getUserInfo } from "@/utils/common";
import styles from "./index.module.scss";
import React from "react";

interface PersonalInfoProps {
  menuFold: boolean;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ menuFold }) => {
  const { username, pic_url } = getUserInfo();

  return (
    <div className={styles.personalInfo}>
      {pic_url ? (
        <img className={styles.avatar} src={pic_url} alt="" />
      ) : (
        <UserOutlined className={styles.avatar} />
      )}
      {menuFold ? null : (
        <div className={classNames(styles.name, ["common-ellipsis-1"])}>
          {username}
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
