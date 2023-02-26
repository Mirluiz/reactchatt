import React, {
  FC,
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MessageMeta } from "../index";
import { useChat, useTheme } from "../../hooks";
import { Avatar, Typography } from "../../elements";
import { MessageImageProps, Image } from "./MessageImageType";
import { raf } from "../../utils/animation";

const Message: FC<
  MessageImageProps & {
    order: "start" | "end" | "middle" | "single";
  }
> = (props) => {
  const {
    images,
    status,
    position,
    date,
    order,
    id,
    title,
    avatar: userAvatar,
  } = props;
  const theme = useTheme();
  const { avatar, onMessageItemClick } = useChat();

  const tail = order === "end" || order === "single";
  const singleImage = images?.length === 1 && images[0];

  return (
    <div
      className="rc-message-image_container"
      style={{
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {avatar && (
        <>
          {position === "left" && !tail && (
            <div
              style={{
                width: "30px",
                minWidth: "30px",
              }}
            />
          )}
          {position === "left" && tail && (
            <Avatar img={userAvatar} name={title} />
          )}
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
          width: singleImage ? singleImage.width : "auto",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flow-root",
          }}
        >
          <Images messageId={id} images={images} />
          <MessageMeta
            date={date}
            status={status}
            style={"image"}
            position={position}
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
  const { onMessageItemClick } = useChat();

  const height = useRef(300);
  const singleImage = images?.length === 1 && images[0];
  const width = document.querySelector(".reactchat")?.clientWidth;

  return (
    <div
      style={{
        width: width ? width * 0.5 : 300,
      }}
    >
      {singleImage ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            overflow: "hidden",
            height: singleImage.height + "px",
            width: singleImage.width + "px",
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
            style={{
              width: "100%",
              height: height.current,
            }}
            className="rc-images_container"
          >
            <ul
              style={{
                gridTemplateColumns: `1fr ${images.length === 2 ? 1 : 0.5}fr`,
                gap: "4px",
                listStyle: "none",
                display: "grid",
                padding: 0,
                margin: 0,
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
                  return index === 0
                    ? height.current
                    : height.current / (length - 1) -
                        (4 * (length - 2)) / (length - 1);
                };

                return (
                  <li
                    style={{
                      gridColumnEnd: `span 1`,
                      gridRowEnd: `span ${index === 0 ? length - 1 : 1}`,
                    }}
                  >
                    <div
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
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                      }}
                    >
                      {index === length - 1 && needGroup && (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backdropFilter: "blur(2px)",
                          }}
                        >
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

export default memo(Message);
