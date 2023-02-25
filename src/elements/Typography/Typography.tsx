import React, { FC } from "react";

const Typography: FC<TypographyProps> = (props) => {
  const { children, color, size } = props;

  const sizes = {
    s: ".7rem",
    m: "1rem",
    l: "2rem",
  };

  return (
    <div
      className="rc-typography"
      style={{
        color: color,
        fontSize: size ? sizes[size] : sizes["m"],
      }}
    >
      {children}
    </div>
  );
};

interface TypographyProps {
  children: React.ReactNode;
  color?: string;
  size?: "s" | "m" | "l";
}

export default Typography;
