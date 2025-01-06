import React from "react";
import { Modal, Button } from "antd";


import styles from './index.module.scss';
export type AlertType = "upgrade" | "login";

interface AlertModalProps {
  type: 'login' | 'upgrade';
  visible: boolean;
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ type, visible, onClose }) => {
  if (type === "login") {
    return (
      <Modal
        title="Login Required"
        open={visible}
        onCancel={onClose}
        className={styles.modalWrapper}
        footer={[
          <Button 
            key="sign-up" 
            className={styles.button}
            onClick={() => window.open("/sign-up")}
          >
            Sign up
          </Button>,
          <Button 
            key="login" 
            type="primary" 
            className={styles.button}
            onClick={() => window.open("/sign-in")}
          >
            Sign in
          </Button>,
        ]}
      >
        <div className={styles.contentWrapper}>
          <p>Please sign in to access this feature.</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      title="Upgrade Required"
      open={visible}
      onCancel={onClose}
      className={styles.modalWrapper}
      footer={[
        <Button
          key="upgrade"
          type="primary"
          className={styles.button}
          onClick={() => window.open("/pricing")}
        >
          Upgrade Now
        </Button>,
      ]}
    >
      <div className={styles.contentWrapper}>
        <p>Your current user level does not allow access to this feature.</p>
        <p>Please upgrade to plan to unlock this functionality.</p>
      </div>
    </Modal>
  );
};

export default AlertModal;