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
      className={`rc-avatar  ${variant ?? "rounded"}`}
    >
      {img && <img height="100%" width="100%" src={img} />}
      {!img && <div>{name?.charAt(0) ?? "U"}</div>}
    </div>
  );
};

export default Avatar;
