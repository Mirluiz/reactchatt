import React, { FC, useContext } from "react";
import { MessageMeta } from "../index";
import { useChat, useTheme } from "../../hooks";
import MessageReply from "../MessageReply";
import { Avatar, Typography } from "../../elements";
import { borderByOrder } from "../../utils/theme";
import { MessageTextProps } from "./MessageType";

const Message: FC<
  MessageTextProps & {
    order: "start" | "end" | "middle" | "single";
  }
> = (props) => {
  const {
    order,
    id,
    position,
    date,
    title,
    repliedMessage,
    text,
    avatar: userAvatar,
  } = props;
  const { avatar, onClick, onLongClick } = useChat();
  const theme = useTheme();

  const tail = order === "end" || order === "single";

  return (
    <div className="rc-message-text_container">
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
        className="rc-message-text"
        style={{
          flexDirection: position === "left" ? "row-reverse" : "initial",
        }}
      >
        <div
          className="rc-message-text_body"
          onClick={(e) => {
            onClick(id);
            e.stopPropagation();
          }}
          style={{
            flexDirection: position === "left" ? "row-reverse" : "initial",
            backgroundColor:
              position === "left" ? theme.palette.left : theme.palette.right,
            ...borderByOrder(theme, position, order),
          }}
        >
          <div>
            {repliedMessage && (
              <div style={{ paddingBottom: ".4rem" }}>
                <MessageReply {...repliedMessage} />
              </div>
            )}
            <div
              style={{
                display: "flow-root",
              }}
            >
              <div>
                <div
                  color={
                    position === "left"
                      ? theme.palette.leftTitle
                      : theme.palette.rightTitle
                  }
                >
                  {position === "left" ?? title}
                </div>
              </div>
              <Typography
                color={
                  position === "left"
                    ? theme.palette.onLeft
                    : theme.palette.onRight
                }
              >
                {text}
              </Typography>
              <MessageMeta date={date} status={1} position={position} />
            </div>
          </div>
        </div>
        {tail && (
          <div
            className={`rc-message-text-tail ${
              position === "left" ? "left" : "right"
            }`}
          >
            <svg
              className="bubble_icon"
              width="5px"
              height="10px"
              viewBox="0 0 5 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                stroke="none"
                fill="none"
                transform={
                  position === "left" ? "scale(-1, 1) translate(-5, 0)" : ""
                }
              >
                <path
                  d="M 0 10
                 H 5
                 V 10
                 Q 1 6 0 0
                 Z"
                  fill={
                    position === "left"
                      ? theme.palette.left
                      : theme.palette.right
                  }
                />
              </g>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
