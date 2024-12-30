
import { svgMap } from '@/constants/svg';
import { Button, Divider, InputNumber, Select, Typography, Modal } from 'antd';
import { QRCodeSVG } from 'qrcode.react';
import { useImmer } from 'use-immer';
import { Plan, getPlan, getPlans, getPaymentMethods, UserPayMethod } from '@/service/plan';
import { useRequest } from 'ahooks';
import styles from './index.module.scss';

const { Paragraph, Text } = Typography;

interface PaymentProps {
  label: string;
  value: string;
}

const Subscribe = () => {
  const [plans, setPlans] = useImmer([] as Array<Plan>);
  const [isModalVisible, setIsModalVisible] = useImmer(false);
  const [selectedPlanId, setSelectedPlanId] = useImmer<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useImmer<Plan | null>(null);
  const [currentMonth, setCurrentMonth] = useImmer(3);
  const [paymentMethods, setPaymentMethods] = useImmer([] as PaymentProps[]);
  const [selectedAddress, setSelectedAddress] = useImmer('');

  // Fetch plans
  useRequest(() => getPlans(), {
    onSuccess: (res) => {
      setPlans(res);
    },
  });

  // Fetch selected plan details
  const { loading: planLoading } = useRequest(
    () => selectedPlanId ? getPlan(selectedPlanId) : Promise.resolve(null),
    {
      refreshDeps: [selectedPlanId],
      ready: !!selectedPlanId,
      onSuccess: (data) => {
        if (data) {
          setSelectedPlan(data);
        }
      }
    }
  );

  // Fetch payment methods
  const { loading: methodsLoading } = useRequest(() => getPaymentMethods(), {
    ready: isModalVisible,
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

  const calculateTotal = () => {
    if (!selectedPlan?.price || typeof selectedPlan.price !== 'number') return 0;
    return (selectedPlan.price * currentMonth).toFixed(2);
  };

  const handleSubscribeClick = (planId: number) => {
    setSelectedPlanId(planId);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedPlanId(null);
    setSelectedPlan(null);
    setCurrentMonth(3);
  };

  const handlePayment = () => {
    // Handle payment here
    handleModalClose();
  };

  const PaymentModal = () => (
    <Modal
      open={isModalVisible}
      onCancel={handleModalClose}
      footer={null}
      width={800}
      className={styles.paymentModal}
    >
      <div className={styles.payment}>
        {/* <div className={styles.left}>
          {svgMap['payment']}
          <div className={styles.text}>Payment</div>
          <div className={styles.desc}>Pay with USDT, USDC, ETH</div>
        </div> */}
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
          <div style={{color: "gray"}}>
            You can transfer ETH, USDT, USDC from personal wallet or CEX. 
            We will check the balance of the target wallet automatically. 
            Transfer from CEX always takes longer. If you meet any issue, get in touch with us
          </div>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className={styles.subscribe}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div>{svgMap['price']}</div>
          <div className={styles.title}>Flexible Pricing</div>
          <div className={styles.desc}>Pay by crypto</div>
        </div>
        <div className={styles.subscribeList}>
          {plans?.map(i => (
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
                {i.desc?.map(Idesc => (
                  <p key={Idesc.id}>{Idesc.title}</p>
                ))}
              </div>
              <div
                className={styles.btn}
                onClick={() => handleSubscribeClick(i.id)}
              >
                Subscribe
              </div>
            </div>
          ))}
        </div>
      </div>
      <PaymentModal />
    </div>
  );
};

export default Subscribe;