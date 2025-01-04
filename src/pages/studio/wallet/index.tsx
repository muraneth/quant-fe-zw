import React from "react";
import WalletDetail from "./wallet_detail";
import WalletTable from "./wallet_table";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons"; // Ant Design icon
import { Button } from "antd"; // Ant Design Button

const Wallets = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const wallet_address = queryParams.get("wallet_address") as string;

  return (
    <div>
      {wallet_address ? (
        <div>
          {/* Back button */}
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)} // Navigate back to the previous page
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
