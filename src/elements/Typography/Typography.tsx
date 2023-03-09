import React, { FC } from "react";

const Typography: FC<TypographyProps> = (props) => {
  const { children, color, size, bold, title, fontSize } = props;

  const boldStyles = {
    thin: "300",
    normal: "normal",
    bold: "600",
  };

  const sizes = {
    es: ".5rem",
    s: ".63rem",
    m: "1rem",
    l: "2rem",
  };

  return (
    <div
      title={title}
      className="rc-typography"
      style={{
        color: color,
        fontSize: fontSize ? fontSize : size ? sizes[size] : sizes["m"],
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

  fontSize?: string;
  bold?: "thin" | "normal" | "bold";
  title?: string;
}

export default Typography;
