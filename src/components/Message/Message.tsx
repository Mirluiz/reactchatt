import React, { FC, useContext, useEffect, useMemo } from "react";
import { MessageMeta } from "../index";
import { useChat, useTheme } from "../../hooks";
import MessageReply from "../MessageReply";
import { Avatar, Typography } from "../../elements";
import { borderByOrder } from "../../utils/theme";
import { MessageTextProps } from "./MessageType";
import { tail as tailFN } from "../../assets/icons";

const Message: FC<
  MessageTextProps & {
    order: "start" | "end" | "middle" | "single";
  }
> = (props) => {
  const theme = useTheme();
  const { order, id, date, repliedMessage, text, owner } = props;
  const { props: globalProps, getPosition } = useChat();
  const { avatar, onMessageClick, onMessageLongTouch, title } = globalProps;
  const tail = useMemo(() => {
    return order === "end" || order === "single";
  }, [order]);
  const position = useMemo(() => {
    return getPosition(props);
  }, [props]);

  useEffect(() => {
    console.log("theme", theme);
  }, [theme]);

  return (
    <div
      className="rc-message-text_container"
      onClick={(e) => {
        if (onMessageClick) {
          onMessageClick(id);
          e.stopPropagation();
        }
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
            <Avatar img={owner.avatar} name={owner.name} />
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
                  style={{
                    color:
                      position === "left"
                        ? theme.palette.leftTitle
                        : theme.palette.rightTitle,
                  }}
                >
                  {position === "left" && title ? owner.name : ""}
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
              <MessageMeta
                date={date}
                status={1}
                position={position}
                style={"text"}
              />
            </div>
          </div>
        </div>
        {tail && (
          <div
            className={`rc-message-text-tail ${
              position === "left" ? "left" : "right"
            }`}
          >
            {tailFN(
              position === "left" ? theme.palette.left : theme.palette.right,
              position
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
