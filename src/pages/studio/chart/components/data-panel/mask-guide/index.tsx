import { Button,Typography } from "antd";
import { svgMap } from "@/constants/svg";
import styles from "./index.module.scss";
import { getUserInfo } from '@/utils/common';

const MaskGuide = () => {
  const userInfo = getUserInfo()
  const toLoginPage =()=>{
    window.location.href = "/sign-in";
  }
  const toSignUpPage =()=>{
    window.location.href = "/sign-up";
  }
  const toPricingPage = () => {
    window.location.href = "/pricing";
  };

  return (
    <div className={styles.maskGuide}>
      
      <div className={styles.content}>
        {svgMap["lock"]}
        <Typography.Title level={4}>
              Unlock Full Access
            </Typography.Title>
            <Typography.Paragraph >
              Upgrade your plan to view the chart
            </Typography.Paragraph>
          <div>
            {(!userInfo||!userInfo.level)?(
                <div style={{display:"flex", gap:'12px'}}>
                    <Button  
                     className={styles.upgradeBtn}
                     onClick={toSignUpPage}> sign-up
                     </Button>
                   <Button  className={styles.upgradeBtn}
                 type="primary" onClick={toLoginPage}> sign-in</Button>
                </div>
             
            ):(
               <div>
               <Button
                 className={styles.upgradeBtn}
                 type="primary"
                 onClick={toPricingPage}
               >
                 <span className={styles.upgradeBtnText}>Upgrade Now</span>
               </Button>
             
           </div>
            )
            }
          </div>
        
      </div>
    </div>
  );
};

export default MaskGuide;