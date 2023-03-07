import React, { FC, memo, useRef } from "react";
import { MessageMeta } from "../index";
import { useChat, useTheme } from "../../hooks";
import { Avatar, Typography } from "../../elements";
import { MessageImageProps, Image } from "./MessageImageType";

const Message: FC<
  MessageImageProps & {
    order: "start" | "end" | "middle" | "single";
  }
> = (props) => {
  const { images, status, date, order, id, owner, edited, pending } = props;
  const { props: globalProps, getPosition } = useChat();
  const { avatar } = globalProps;

  const tail = order === "end" || order === "single";
  const singleImage = images?.length === 1 && images[0];
  const position = getPosition(props);

  return (
    <div className="rc-message-image_container">
      {avatar && (
        <>
          {position === "left" && !tail && <Blank />}
          {position === "left" && tail && (
            <div
              style={{
                marginLeft: "3px",
              }}
            >
              <Avatar img={owner.avatar} name={owner.name} />
            </div>
          )}
        </>
      )}
      <div
        className="rc-message-image_body"
        style={{
          width: singleImage ? singleImage.width : "auto",
        }}
      >
        <div>
          <Images messageId={id} images={images} />
          <MessageMeta
            date={date}
            status={status}
            style={"image"}
            position={position}
            edited={edited ?? false}
            pending={pending ?? false}
          />
        </div>
      </div>
    </div>
  );
};

const Images: FC<{ messageId: string; images: Array<Image> | undefined }> = (
  props
) => {
  const { messageId, images } = props;
  const { onMessageItemClick } = useChat().props;

  const height = useRef(300);
  const singleImage = images?.length === 1 && images[0];
  const width = document.querySelector(".reactchat")?.clientWidth;

  return (
    <div
      style={{
        width: singleImage ? "" : width ? width * 0.5 : 300,
        maxHeight: 300,
        minHeight: 100,
      }}
    >
      {singleImage ? (
        <div
          className={"rc-singleImage_container"}
          style={{
            height: Math.min(singleImage.height, 300) + "px",
          }}
        >
          <img
            style={{
              objectFit: "cover",
              height: "100%",
              width: "100%",
            }}
            loading="lazy"
            alt={singleImage.title}
            src={singleImage.url}
          />
        </div>
      ) : (
        images && (
          <div
            className="rc-images_container"
            style={{
              height: height.current,
            }}
          >
            <ul
              className={"rc-lu"}
              style={{
                gridTemplateColumns: `1fr ${images.length === 2 ? 1 : 0.5}fr`,
              }}
            >
              {images?.map((img, index, images) => {
                if (index > 4) return;

                const length = Math.min(images.length, 4);
                const needGroup = images.length > 3;

                const getWidth = () => {
                  return index === 0
                    ? images.length === 2
                      ? "50%"
                      : "66%"
                    : images.length === 2
                    ? "50%"
                    : "33%";
                };

                const getHeight = () => {
                  const gapSize = 2;

                  return index === 0
                    ? height.current
                    : height.current / (length - 1) -
                        (gapSize * (length - 2)) / (length - 1);
                };

                return (
                  <li
                    className={"rc-li"}
                    style={{
                      gridColumnEnd: `span 1`,
                      gridRowEnd: `span ${index === 0 ? length - 1 : 1}`,
                    }}
                  >
                    <div
                      className={"rc-li_image"}
                      onClick={(e) => {
                        if (onMessageItemClick) {
                          onMessageItemClick(
                            messageId,
                            index === length - 1 && needGroup ? false : img.id
                          );
                          e.stopPropagation();
                        }
                      }}
                      style={{
                        width: `${getWidth()}px`,
                        height: `${getHeight()}px`,
                        boxShadow:
                          index === length - 1 && needGroup
                            ? "inset 0 0 0 1000px rgba(0,0,0,.5)"
                            : "",
                        backgroundImage: `url(${img.url})`,
                      }}
                    >
                      {index === length - 1 && needGroup && (
                        <div className={"rc-li-group_image"}>
                          <Typography color={"white"} size={"l"}>
                            +{images.length - 3}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

const Blank = () => {
  return (
    <div
      style={{
        width: "33px",
        minWidth: "33px",
      }}
    />
  );
};

export default memo(Message);
