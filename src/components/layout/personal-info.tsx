import classNames from "classnames";
import styles from "./index.module.scss";
import React from "react";

interface PersonalInfoProps {
  menuFold: boolean;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ menuFold }) => {
  return (
    <div className={styles.personalInfo}>
      <img
        className={styles.avatar}
        src="https://avatars.githubusercontent.com/u/30647295?v=4"
        alt=""
      />
      {menuFold ? null : (
        <div className={classNames(styles.name, ["common-ellipsis-1"])}>
          zongwei
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
