import React, { Children, DOMAttributes, FC } from "react";
import { useTheme } from "../../hooks";

const IconButton: FC<IconButtonProps> = (props) => {
  const { children, onClick, color } = props;
  const theme = useTheme();

  return (
    <button
      onClick={() => {
        if (onClick) onClick();
      }}
      className="rc-icon_button"
    >
      <div className="rc-icon_div">{children}</div>
    </button>
  );
};

interface IconButtonProps extends DOMAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
}

export default IconButton;
