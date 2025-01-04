import WalletDetail from "./wallet_detail";
import WalletTable from "./wallet_table";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styles from "./index.module.scss";

const Wallets = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const wallet_address = queryParams.get("wallet_address") as string;

  const handleBack = () => {
    // Remove wallet_address from the query parameters
    queryParams.delete("wallet_address");
    const newSearch = queryParams.toString();
    const newPath = `${location.pathname}${newSearch ? `?${newSearch}` : ""}`;
    navigate(newPath);
  };

  return (
    <div className={styles.wallet}>
      {wallet_address ? (
        <div>
          {/* Back button */}
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack} // Navigate back to the origin URL
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              zIndex: 1000,
            }}
          >
            Back
          </Button>
          <WalletDetail wallet_address={wallet_address} />
        </div>
      ) : (
        <WalletTable />
      )}
    </div>
  );
};

export default Wallets;
