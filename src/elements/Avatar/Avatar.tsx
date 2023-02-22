import React, { FC } from "react";

const Avatar: FC<{
  variant?: "square" | "rounded";
  img?: string;
  name?: string;
}> = (props) => {
  const { img, name, variant } = props;

  return (
    <div
      style={{
        backgroundColor: img ? "" : "#bdbdbd",
      }}
      className={`rc-avatar  ${variant ?? "square"}`}
    >
      {img && <img height="100%" width="100%" src={img} />}
      {!img && (
        <div
          style={{
            marginTop: 3,
          }}
        >
          {name ?? "U"}
        </div>
      )}
    </div>
  );
};

export default Avatar;
