import { useImmer } from 'use-immer';
import { useCommonStore } from '@/store/common';
import styles from "./index.module.scss";

const Home = () => {
  const [state, setState] = useImmer(0);
  const userName = useCommonStore(store => store.userName)
  return <div className={styles.home} onClick={() => setState(999)}>home: {userName}{state}</div>;
}

export default Home;
