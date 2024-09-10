import React, { type ReactNode } from 'react';
interface Props {
  visible: boolean;
  children: ReactNode;
}

const Visible: React.FC<Props> = ({ visible, children }) => {
  return <>{visible ? children : null}</>;
};

export default Visible;
