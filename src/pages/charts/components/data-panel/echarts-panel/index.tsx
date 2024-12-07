import { findKeyByValueFromMapping } from "@/utils/common";
import styles from '../index.module.scss';

const findKeyIns = findKeyByValueFromMapping({
  isSwingRatioChart: ["avgcost_ratio"],
  isStackAreaChart: ["stack_balance_ratio"],
  isAvgCostChart: ["AvgCost", "avg_cost"],
  isBasicVolumeChart: [
    "TradeVolume",
    "DailyTradeVolumeUSD",
    "DailyTxVolume",
    "USDPnNVolume",
    "PnNVolume",
    "RobotVolume",
    "TradingVolumeWithoutBot",
  ],
  isPriceByVolumeChart: ["PriceByVolumeTimeRange", "WalletPriceByVolume"],
});

// isBaseLineChart

const EchartsPanel = () => {
  return (
    <div className={styles.echartsPanel}>
      888888
    </div>
  )
}

export default EchartsPanel;