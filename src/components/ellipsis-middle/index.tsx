import React from 'react';
import { Typography } from 'antd';
import { svgMap } from '@/constants/svg';
const { Text } = Typography;

export interface EllipsisMiddleProps {
  children: string
  suffixCount?: number
  className?: string
  title?: string
  chain?:string
}

const CHAIN_LOGO: Record<string, React.ReactElement> = {
  ethereum: svgMap['ethLogo'],
  base: svgMap['baseLogo']
};
const EllipsisMiddle: React.FC<EllipsisMiddleProps> = ({
  suffixCount = 12,
  children,
  className,
  title,
  chain
}) => {
  const start = children?.slice(0, children?.length - suffixCount);
  const suffix = children?.slice(-suffixCount).trim();
  return (
    <div style={{display:"flex", alignContent:"center",marginLeft:"6px"}}>
      {
        chain&&CHAIN_LOGO[chain] 
      } 
       <Text title={title} className={className} style={{ maxWidth: '100%' }} ellipsis={{ suffix }}>
      {start}
    </Text>
    </div>
   
  );
};


export default EllipsisMiddle