import { svgMap } from '@/svg';
import { Button, Divider, InputNumber, Select, Typography } from 'antd'
import styles from './index.module.scss';
import { QRCodeSVG } from 'qrcode.react';
import { useImmer } from 'use-immer';

const { Paragraph, Text } = Typography;

const Payment = () => {
  const [price, setPrice] = useImmer(45);
  const [currentMonth, setCurrentMonth] = useImmer(3);

  return (
    <div className={styles.payment}>
      <div className={styles.left}>
        {svgMap['payment']}
        <div className={styles.text}>Payment</div>
        <div className={styles.desc}>Pay with USDT , USDC , ETH</div>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>How Long do you want to subscribe ?</div>
        <div className={styles.desc}>Get discount the subscribe 3 months or 1year</div>
        <div className={styles.monthsInfo}>
          <InputNumber min={1} value={currentMonth} onChange={(v) => { setCurrentMonth(Number(v)) }} />
          <span>months</span>
        </div>
        <div className={styles.totalInfo}>
          <div className={styles.total}>{price * currentMonth}</div>
          <span>USDT in total</span>
        </div>
        <div className={styles.tips}>Original price <Text delete style={{ color: '#2255FF' }}>150</Text> USDT, save <span style={{ color: '#2255FF' }}>10%</span></div>
        <Divider style={{ background: 'rgba(0, 0, 0, 0.8)' }} />
        <div className={styles.network}>
          <span className={styles.text}>Choose Network</span>
          <Select
            style={{ marginLeft: 12, width: 140 }}
            defaultValue='Etheruem'
            options={[{ value: 'Etheruem', label: 'Etheruem' }]}
          />
        </div>
        <div className={styles.qrcode}>
          <QRCodeSVG
            value={"https://picturesofpeoplescanningqrcodes.tumblr.com/"}
            title={"Title for my QR Code"}
            size={88}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
          // marginSize={1}
          />
        </div>
        <Paragraph style={{ marginTop: 12 }} copyable>0x12315324234235234545</Paragraph>
        <Button style={{ width: 224 }} type="primary" shape="round" size="large" >Done</Button>
      </div>
    </div>
  );
};

export default Payment;
