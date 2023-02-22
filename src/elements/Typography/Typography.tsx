import React, { FC } from "react";

const Typography: FC<TypographyProps> = (props) => {
  const { children, color } = props;

  return <div className="rc-typography">{children}</div>;
};

interface TypographyProps {
  children: React.ReactNode;
  color?: string;
}

export default Typography;
