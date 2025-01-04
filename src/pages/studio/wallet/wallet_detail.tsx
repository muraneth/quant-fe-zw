import { getWalletInfo, WalletDailyInfo } from "@/service/wallets";
import { useRequest } from "ahooks";
import { useImmer } from "use-immer";
import { useChartStore } from "@/store/charts";

const WalletDetail = ({ wallet_address }: { wallet_address: string }) => {
  const [walletDailyInfo, setWalletDailyInfo] = useImmer<WalletDailyInfo[]>([]);
  const tokenInfo = useChartStore.use.tokenInfo();

  useRequest(
    () =>
      getWalletInfo({
        symbol: tokenInfo.symbol,
        chain: tokenInfo.chain,
        wallet_address,
      }),
    {
      refreshDeps: [tokenInfo],
      onSuccess: (data) => {
        setWalletDailyInfo(() => data);
      },
    }
  );
  return (
    <div>
      {/* You can render your wallet daily info here */}
      {walletDailyInfo.map((info, index) => (
        <div key={index}>{/* Render your wallet info data */}</div>
      ))}
    </div>
  );
};
export default WalletDetail;
