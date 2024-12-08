import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

export interface EllipsisMiddleProps {
  children: string
  suffixCount?: number
  className?: string
  title?: string
}

const EllipsisMiddle: React.FC<EllipsisMiddleProps> = ({
  suffixCount = 12,
  children,
  className,
  title
}) => {
  const start = children?.slice(0, children?.length - suffixCount);
  const suffix = children?.slice(-suffixCount).trim();
  return (
    <Text title={title} className={className} style={{ maxWidth: '100%' }} ellipsis={{ suffix }}>
      {start}
    </Text>
  );
};


export default EllipsisMiddle