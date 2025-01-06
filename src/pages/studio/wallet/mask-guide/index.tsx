import { Button,Typography } from "antd";
import { svgMap } from "@/constants/svg";
import styles from "./index.module.scss";

interface MaskGuideProps {
  type: string;
}
const MaskGuide = ({type}: MaskGuideProps) => {
  
  const toPricingPage = () => {
    window.location.href = "/pricing";
  };
  const getStyle = () => {
    if (type === "chart") {
      return styles.chartMask
    }else {
      return styles.tableMask
    }
  }

  return (

      
      <div className= {getStyle()} >
          <div className={styles.upgradeContent} >
             <div>
             {svgMap["lock"]}
              </div>
            <Typography.Title level={4}>
              Unlock Full Access
            </Typography.Title>
            <Typography.Paragraph >
              Upgrade your plan to view complete wallet data
            </Typography.Paragraph>
            {/* <Typography.Paragraph >
              Advanced user will get top 500 wallet details
            </Typography.Paragraph> */}
            <Button 
              type="primary" 

              onClick={() =>toPricingPage()}
              
            >
              Upgrade Now
            </Button>
          </div>
        </div>

  );
};

export default MaskGuide;
