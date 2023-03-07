import React, { Children, DOMAttributes, FC } from "react";
import { useTheme } from "../../hooks";

const IconButton: FC<IconButtonProps> = (props) => {
  const { children, onClick, background, color } = props;

  return (
    <button
      onClick={() => {
        if (onClick) onClick();
      }}
      className="rc-icon_button"
      style={{
        background: background,
      }}
    >
      <div
        style={{
          background: background,
          fill: color,
        }}
        className="rc-icon_div"
      >
        {children}
      </div>
    </button>
  );
};

interface IconButtonProps extends DOMAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClick?: () => void;
  background?: string;
  color?: string;
}

export default IconButton;
