import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RedoOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode;
}

const ErrorBoundaryWrapper: React.FC<ErrorBoundaryWrapperProps> = ({
  children,
}) => {
  return (
    <ErrorBoundary
      fallback={
        <div className={styles.errorBoundary} onClick={() => location.reload()}>
          Service is missing, please refresh the page <RedoOutlined />
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
