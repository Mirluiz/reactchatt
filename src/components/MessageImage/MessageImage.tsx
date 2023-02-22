import React, { FC, useEffect, useRef } from "react";
import { MessageMeta } from "../index";
import { useChat, useTheme } from "../../hooks";
import { Avatar } from "../../elements";
import { MessageImageProps, Image } from "./MessageImageType";

const Message: FC<
  MessageImageProps & {
    order: "start" | "end" | "middle" | "single";
  }
> = (props) => {
  const { images, status, position, date, order, id } = props;
  const theme = useTheme();
  const { icon, onClick } = useChat();

  const tail = order === "end" || order === "single";

  return (
    <div
      onClick={() => onClick(id)}
      style={{
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {icon && (
        <>
          {position === "left" && !tail && (
            <div
              style={{
                width: "30px",
                minWidth: "30px",
              }}
            />
          )}
          {position === "left" && tail && <Avatar />}
        </>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          borderRadius: 5 * theme.shape.borderRadius,
          outline: "1px solid white",
          marginRight: position === "right" ? "5px" : 0,
          marginLeft: position === "left" ? "5px" : 0,
        }}
      >
        <div
          style={{
            display: "flow-root",
          }}
        >
          <Images images={images} />
          <MessageMeta
            time={"asd"} // TODO: change this
            status={status}
            chip={true}
            position={position}
          />
        </div>
      </div>
    </div>
  );
};

const Images: FC<{ images: Array<Image> | undefined }> = ({ images }) => {
  let image = images && images[0];

  return image ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        maxHeight: "300px",
        maxWidth: "300px",
        overflow: "hidden",
        height: image.height + "px",
        width: image.width + "px",
      }}
    >
      <img
        style={{
          objectFit: "cover",
          height: "100%",
          width: "100%",
        }}
        loading="lazy"
        alt={image.title}
        src={image.url}
      />
    </div>
  ) : (
    <></>
  );
};

export default Message;
