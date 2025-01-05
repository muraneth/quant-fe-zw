import React from "react";
import { Modal, Button } from "antd";

interface AlertModalProps {
  visible: boolean;
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      title="Upgrade Required"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button
          key="upgrade"
          type="primary"
          onClick={() => window.open("/pricing")}
        >
          Upgrade Now
        </Button>,
      ]}
    >
      <p>Your current user level does not allow access to this feature.</p>
      <p>Please upgrade your plan to unlock this functionality.</p>
    </Modal>
  );
};

export default AlertModal;
