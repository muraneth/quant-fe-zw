import styles from './index.module.scss';
import TokenTable from './wallet-table';

const Wallet = () => {
  return <div className={styles.wallet}>
    <TokenTable />
  </div>;
};

export default Wallet;
