import { svgMap } from '@/constants/svg';
import { Button, Divider, InputNumber, Select, Typography } from 'antd';
import styles from './index.module.scss';
import { QRCodeSVG } from 'qrcode.react';
import { useImmer } from 'use-immer';
import { Plan, getPlan, getPaymentMethods, UserPayMethod } from '@/service/plan';
import { useRequest } from 'ahooks';
import { useLocation } from 'react-router-dom';
const { Paragraph, Text } = Typography;

interface PaymentProps {
  label: string;
  value: string;
}

const Payment = () => {
  const location = useLocation();
  const [plan, setPlan] = useImmer({ price: 0 } as Plan); // Initialize with default price
  const [currentMonth, setCurrentMonth] = useImmer(3);
  const [paymentMethods, setPaymentMethods] = useImmer([] as PaymentProps[]);
  const [selectedAddress, setSelectedAddress] = useImmer('');
  
  const id = parseInt(new URLSearchParams(location.search).get('id') || '0');
  
  const { loading: planLoading } = useRequest(() => getPlan(id), {
    onSuccess: (data) => {
      setPlan(data);
    }
  });

  const { loading: methodsLoading } = useRequest(() => getPaymentMethods(), {
    onSuccess: (data) => {
      const methods = data.map((item: UserPayMethod) => ({
        label: item.chain,
        value: item.address
      }));
      setPaymentMethods(methods);
      if (methods.length > 0) {
        setSelectedAddress(methods[0].value);
      }
    }
  });

  const handleNetworkChange = (value: string) => {
    setSelectedAddress(value);
  };

  // Calculate total price safely
  const calculateTotal = () => {
    if (!plan?.price || typeof plan.price !== 'number') return 0;
    return (plan.price * currentMonth).toFixed(2);
  };
  const handlePayment = () => {
    // Handle payment here
  }

  return (
    <div className={styles.payment}>
      <div className={styles.left}>
        {svgMap['payment']}
        <div className={styles.text}>Payment</div>
        <div className={styles.desc}>Pay with USDT, USDC, ETH</div>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>How Long do you want to subscribe?</div>
        <div className={styles.desc}>Get discount for 3 months or longer</div>
        <div className={styles.monthsInfo}>
          <InputNumber 
            min={1} 
            value={currentMonth} 
            onChange={(v) => setCurrentMonth(Number(v) || 1)} 
          />
          <span>months</span>
        </div>
        <div className={styles.totalInfo}>
          <div className={styles.total}>{calculateTotal()}</div>
          <span>USDT in total</span>
        </div>
        <div className={styles.tips}>
          Original price <Text delete style={{ color: '#2255FF' }}>150</Text> USDT, 
          save <span style={{ color: '#2255FF' }}>10%</span>
        </div>
        <Divider style={{ background: 'rgba(0, 0, 0, 0.8)' }} />
        <div className={styles.network}>
          <span className={styles.text}>Choose Network</span>
          <Select
            style={{ marginLeft: 12, width: 140 }}
            value={paymentMethods[0]?.label}
            options={paymentMethods}
            onChange={handleNetworkChange}
            loading={methodsLoading}
          />
        </div>
        <div className={styles.qrcode}>
          <QRCodeSVG
            value={selectedAddress || 'Loading...'}
            title="Payment Address QR Code"
            size={88}
            bgColor="#ffffff"
            fgColor="#000000"
            level="L"
          />
        </div>
        <Paragraph style={{ marginTop: 12 }} copyable>
          {selectedAddress || 'Loading...'}
        </Paragraph>
        <Button 
          style={{ width: 224 }} 
          type="primary" 
          shape="round" 
          size="large"
          loading={planLoading || methodsLoading}
          onClick={handlePayment}
        >
          Done
        </Button>
        <div style={{color:"gray"}}>You can transfer ETH,USDT,USDC from peronal wallet or CEX. We will check the balance of the target wallet automatically.Transfer from CEX always takes longer. If you meet any issue, get in touch with us</div>
      </div>
    </div>
  );
};

export default Payment;