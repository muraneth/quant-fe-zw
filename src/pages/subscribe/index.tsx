
import { Button, Divider, InputNumber, Radio, Typography, Modal, Input,Form } from "antd";
import { QRCodeSVG } from "qrcode.react";
import { useImmer } from "use-immer";
import {
  Plan,
  getPlan,
  getPlans,
  getPaymentMethods,
  UserPayMethod,
  postPaid,
} from "@/service/plan";
import { useRequest } from "ahooks";
import styles from "./index.module.scss";
import { getUserInfo, updateUserInfo } from "@/utils/common";
import { useEffect, useMemo } from "react";
import { CheckCircleFilled } from "@ant-design/icons";

const { Paragraph, Text } = Typography;

interface Payment {
  chain: string;
  address: string;
}
interface PaymentProps {
  label: string;
  value: Payment;
}

const Subscribe = () => {
  // const [plans, setPlans] = useImmer([{}] as Array<Plan>);
  const [basePlans, setBasePlans] = useImmer([] as Plan[]);
  const [advPlans, setAdvPlans] = useImmer([] as Plan[]);
  const [isModalVisible, setIsModalVisible] = useImmer(false);
  const [selectedPlanId, setSelectedPlanId] = useImmer<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useImmer<Plan | null>(null);
  const [currentMonth, setCurrentMonth] = useImmer(3);
  const [paymentMethods, setPaymentMethods] = useImmer([] as PaymentProps[]);
  const [selectedChain, setSelectedChain] = useImmer("");
  const [selectedAddress, setSelectedAddress] = useImmer("");
  const [txHash , setTxHash] = useImmer("");
  const [currentPlan, setCurrentPlan] = useImmer(1);
  const [discountRate, setDiscountRate] = useImmer(1);
  const [originalPrice, setOriginalPrice] = useImmer(0);
  const [totalPrice, setTotalPrice] = useImmer(0);
  const userInfo = getUserInfo();
  const [form] = Form.useForm();
  useEffect(() => {
    if (userInfo) {
      setCurrentPlan(userInfo.level);
    }
   
  }, []);

  useRequest(() => getPlans(), {
    onSuccess: (res) => {
      // setPlans(res);
      // first 3 plans are base plans
      setBasePlans(res.slice(0, 3));
      // the rest are advanced plans
      setAdvPlans(res.slice(3));
    },
  });

  const { loading: planLoading } = useRequest(
    () => (selectedPlanId ? getPlan(selectedPlanId) : Promise.resolve(null)),
    {
      refreshDeps: [selectedPlanId],
      ready: !!selectedPlanId,
      onSuccess: (data) => {
        if (data) {
          setSelectedPlan(data);
        }
      },
    }
  );

  const { run:getPayMethd, loading: methodsLoading } = useRequest(() =>  getPaymentMethods(), {
    ready: true,
    manual: true,
    onSuccess: (data) => {
      const methods = data.map((item: UserPayMethod) => ({
        label: item.chain,
        value: {
          chain: item.chain,
          address: item.address,
        },
      }));
      setPaymentMethods(methods);
      if (methods.length > 0 && !selectedChain) {
        setSelectedChain(methods[0].value.chain);
        setSelectedAddress(methods[0].value.address);
      }
    },
  });

  const handleNetworkChange = (e: any) => {
    const selectedValue = e.target.value;
    const method = paymentMethods.find(
      (item) => item.value.chain === selectedValue
    );
    if (!method) return;
    setSelectedChain(selectedValue);
    setSelectedAddress(method.value.address);
  };
  useEffect(() => {

    const { discountRate,originalPrice, totalPrice } = calculateTotal();
    setDiscountRate(discountRate);
    setOriginalPrice(originalPrice);
    setTotalPrice(totalPrice);

  }, [currentMonth,selectedPlan]);

  const calculateTotal = () => {
    if (!selectedPlan?.price || typeof selectedPlan.price !== "number") {
      return { discountRate: 1,originalPrice:0 , totalPrice: 0};
    }

    let discountStrategies = selectedPlan.discount_strategies;
    let discountRate = 1;
  
    for (let i = 0; i < discountStrategies.length; i++) {
      if (currentMonth >= discountStrategies[i].threshold_months) {
        // find the last discount strategy that is less than or equal to currentMonth
        discountRate = discountStrategies[i].discount_rate;
      }
    }
    const originalPrice = selectedPlan.price * currentMonth;
    const totalPrice = (selectedPlan.price * currentMonth * discountRate);
    return { discountRate,originalPrice, totalPrice };
  };

  const handleSubscribeClick = async (planId: number) => {
   
    await getPayMethd();
    setSelectedPlanId(planId);
    setIsModalVisible(true);
  };
  const handleContactClick = () => {

    window.open(`https://t.me/mura202211`, '_blank');
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedPlanId(null);
    setSelectedPlan(null);
    setCurrentMonth(3);
  };
  
  const { runAsync: runPostPaid, loading: runPostPaidLoading } = useRequest(
    () =>
      postPaid({
        level: selectedPlan?.level || 1,
        duration: currentMonth,
        chain: selectedChain,
        address: selectedAddress,
        tx_hash: txHash,
        amount: totalPrice,
      }),
    {
      manual: true,
      onSuccess: (res) => {
        handleModalClose();
        updateUserInfo(res);
      },
      onError: (err) => {
        console.log(err);
        if (err.message === "TX_ERROR") {
          form.setFields([
            {
              name: "txhash",
              errors: ["Invalid tx hash"],
            },
          ]);
        }
      },
    }
  );
  const handlePostPaid = () => {

    if (!txHash  ||txHash.trim().length !== 66) {
      form.setFields([
        {
          name: "txhash",
          errors: ["Tx hash is required"],
        },
      ]);
      return;
    }
    runPostPaid();
  }

  const renderSubscribeButton = (plan: Plan) => {
    const isCurrentPlan = plan.level === currentPlan;

    if (isCurrentPlan) {
      return (
        <div className={`${styles.btn} ${styles.currentPlan}`}>
          <CheckCircleFilled style={{ marginRight: 4}} />
          <div>Current Plan</div>
        </div>
      );
    }
    if (plan.is_popular) {
      return (
        <div className={`${styles.btn} ${styles.popolarPlan}`} onClick={() => handleSubscribeClick(plan.id)}>
          Subscribe
        </div>
      );
    }
    if (plan.type==='custom') {
      return (
        <div className={styles.btn} onClick={() => handleContactClick()}>
          Contact
        </div>
      );
    }

    return (
      <div className={styles.btn} onClick={() => handleSubscribeClick(plan.id)}>
        Subscribe
      </div>
    );
  };
  const testTxHash = (txHash: string) => {
    return txHash.trim().length === 66;
  }
  // Memoize the payment modal content
  const paymentModalContent = useMemo(
    () => (
      <div className={styles.payment}>
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
            <div className={styles.total}>{totalPrice.toFixed(2)}</div>
            <span>USDT in total</span>
          </div>
          <div className={styles.tips}>
            Original price{" "}
            <Text delete style={{ color: "#2255FF" }}>
            {originalPrice}
            </Text>{" "}
            USDT, save <span style={{ color: "#2255FF" }}>{((1-discountRate)*100).toFixed(2)}%</span>
          </div>
          <Divider style={{ background: "rgba(0, 0, 0, 0.8)" }} />
          <div className={styles.network}>
            <span className={styles.text}>Choose Network</span>
            <Radio.Group
              value={selectedChain}
              onChange={handleNetworkChange}
              style={{ marginLeft: 12 }}
            >
              {paymentMethods.map((method) => (
                <Radio key={method.value.chain} value={method.value.chain}>
                  {method.label}
                </Radio>
              ))}
            </Radio.Group>
          </div>
          <div className={styles.qrcode}>
            { selectedAddress  && <QRCodeSVG
              value={selectedAddress || "Loading..."}
              title="Payment Address QR Code"
              size={88}
              bgColor="#ffffff"
              fgColor="#000000"
              level="L"
            />}
            
          </div>
          <Paragraph style={{ marginTop: 12 }} copyable>
            {selectedAddress || "Loading..."}
          </Paragraph>
          <Form  form={form} style={{width: "100%",display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Form.Item
            style={{width: "60%"}}
            name="txhash"
            label="Tx Hash"
            // tooltip="Must contain 66 characters, including 0x prefix"
            rules={[
              { required: true },
              () => ({
                validator(_, value) {
                  if (testTxHash(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Tx hash must be 66 characters, including 0x prefix"
                    )
                  );
                },
              }),
            ]}
          >

          <Input
            placeholder="Enter your tx hash"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)} />

          </Form.Item>
          <Button
            style={{ width: 224 }}
            type="primary"
            shape="round"
            size="large"
            loading={planLoading || methodsLoading || runPostPaidLoading}
            onClick={handlePostPaid}
          >
            Done
          </Button>
          </Form>
          <div style={{ color: "gray", paddingBottom: 16 }}>
            You can transfer USDT from personal wallet or CEX. We will check the
            balance of the target wallet automatically. Transfer from CEX always
            takes longer. If you meet any issue, get in touch with me  <a href="https://t.me/mura202211">Telegram</a>
          </div>
        </div>
      </div>
    ),
    [
      currentMonth,
      selectedChain,
      selectedAddress,
      paymentMethods,
      planLoading,
      methodsLoading,
      calculateTotal,
    ]
  );
  const renderPlans = (plans: Plan[]) => {
    return plans.map((plan) => (
      <div key={plan.id} className={styles.item}>
        <div className={styles.header}>
          <span className={styles.headerTitle}>{plan.title}</span>
          {plan.is_popular && (
            <span className={styles.popolar}>MOST POPULAR</span>
          )}
        </div>
        <div className={styles.priceInfo}>
          <span>${plan.price}</span>
          <span>/{plan.util}</span>
        </div>
        <div className={styles.descList}>
          {plan.desc?.map((Idesc) => (
            <p key={Idesc.id}>
            <span className={styles.bullet}>•</span> {Idesc.title}
          </p>
          ))}
        </div>
        {renderSubscribeButton(plan)}
      </div>
    ));
  }

  return (
    <div className={styles.subscribe}>
      <div className={styles.content}>
        <div className={styles.top}>
          {/* <div>{svgMap["price"]}</div> */}
          <div className={styles.title}>Easy pay in USDT using Layer2</div>
        </div>
        <div >
          <div className={styles.subscribeList}>
            {basePlans&&basePlans.length>0 &&(renderPlans(basePlans))}
          </div>
          <Divider style={{ background: "rgba(0, 0, 0, 0.8)" }} />
          <div className={styles.subscribeList}>
            {advPlans&&advPlans.length>0 &&(renderPlans(advPlans))}
        </div>
        </div>
      </div>
      <Modal
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        className={styles.paymentModal}
        destroyOnClose={false}
      >
        {paymentModalContent}
      </Modal>
      
    </div>
  );
};

export default Subscribe;
