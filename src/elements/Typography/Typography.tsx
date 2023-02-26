import React, { FC } from "react";

const Typography: FC<TypographyProps> = (props) => {
  const { children, color, size, bold } = props;

  const boldStyles = {
    thin: "300",
    normal: "normal",
    bold: "900",
  };

  const sizes = {
    es: ".5rem",
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
        fontWeight: bold ? boldStyles[bold] : boldStyles["normal"],
      }}
    >
      {children}
    </div>
  );
};

interface TypographyProps {
  children: React.ReactNode;
  color?: string;
  size?: "es" | "s" | "m" | "l";
  bold?: "thin" | "normal" | "bold";
}

export default Typography;
