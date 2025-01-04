import WalletDetail from "./wallet_detail";
import WalletTable from "./wallet_table";

const Wallets = () => {
  const queryParams = new URLSearchParams(location.search);
  const wallet_address = queryParams.get("wallet_address") as string;
  // 这里点击列表某一项之后没有刷新，待处理

  return (
    <div>
      {wallet_address ? (
        <WalletDetail wallet_address={wallet_address} />
      ) : (
        <WalletTable />
      )}

      {/* <WalletDetail wallet_address={wallet_address} /> */}
    </div>
  );
};
export default Wallets;
