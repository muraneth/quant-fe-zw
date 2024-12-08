import { svgMap } from '@/constants/svg';
import { useNavigate } from "react-router-dom";
import styles from './index.module.scss';

const _mockData = [
  {
    price: 0,
    util: 'month',
    desc: [
      { title: '这是一段描述1', id: 1 },
      { title: '这是一段描述2', id: 2 },
      { title: '这是一段描述3', id: 3 },
      { title: '这是一段描述4', id: 4 },
    ],
    id: 1,
    type: 'FREE',
    isPopolar: false,
  },
  {
    price: 54,
    util: 'month',
    desc: [
      { title: '这是一段描述1', id: 1 },
      { title: '这是一段描述2', id: 2 },
      { title: '这是一段描述3', id: 3 },
      { title: '这是一段描述4', id: 4 },
    ],
    id: 2,
    isPopolar: false,
    type: 'ADVANCED',
  },
  {
    price: 99,
    util: 'month',
    desc: [
      { title: '这是一段描述1', id: 1 },
      { title: '这是一段描述2', id: 2 },
      { title: '这是一段描述3', id: 3 },
      { title: '这是一段描述4', id: 4 },
    ],
    id: 3,
    isPopolar: true,
    type: 'PROFESSIONAL'
  },
  {
    price: 999,
    util: 'month',
    desc: [
      { title: '这是一段描述1', id: 1 },
      { title: '这是一段描述2', id: 2 },
      { title: '这是一段描述3', id: 3 },
      { title: '这是一段描述4', id: 4 },
    ],
    id: 4,
    isPopolar: false,
    type: 'CUSTOMISE'
  },
]

const Subscribe = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.subscribe}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div>{svgMap['price']}</div>
          <div className={styles.title}>Flexible Pricing</div>
          <div className={styles.desc}>Flexible and affording plans tailored to your needs. Save up to 10% for a annual plan</div>
        </div>
        <div className={styles.subscribeList} >
          {
            _mockData?.map(i => (
              <div key={i.id} className={styles.item}>
                <div className={styles.header}>
                  <span className={styles.headerTitle}>{i.type}</span>
                  {i.isPopolar && <span className={styles.popolar}>MOST POPULAR</span>}
                </div>
                <div className={styles.priceInfo}>
                  <span>${i.price}</span>
                  <span>/{i.util}</span>
                </div>
                <div className={styles.descList}>
                  {
                    i.desc?.map(Idesc => (
                      <p key={Idesc.id}>{Idesc.title}</p>
                    ))
                  }
                </div>
                <div className={styles.btn} onClick={() => {
                  navigate(`/payment?id=${i.id}`);
                }}>
                  Subscribe
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
