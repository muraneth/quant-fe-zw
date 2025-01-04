import { Button } from "antd";
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
        <span className={styles.text}>when to buy token?</span>
        <span className={styles.text}>When to sell ?</span>
        <span className={styles.text}>
          Find out the best timing to by token
        </span>
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
               {/* <span className={styles.text}>
                 Get access to unique indicator that no where else provide
               </span> */}
           </div>
            )
            }
          </div>
        
      </div>
    </div>
  );
};

export default MaskGuide;
