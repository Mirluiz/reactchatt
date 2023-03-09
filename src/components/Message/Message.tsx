import React, { FC, useMemo } from "react";
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
  const { order, id, date, repliedMessage, text, owner, status, edited } =
    props;
  const { props: globalProps, getPosition } = useChat();
  const { avatar, onMessageClick, title } = globalProps;
  const tail = useMemo(() => {
    return order === "end" || order === "single";
  }, [order]);
  const position = useMemo(() => {
    return getPosition(props);
  }, [props]);

  return (
    <div
      className="rc-message-text_container"
      onClick={(e) => {
        if (onMessageClick) {
          onMessageClick(id);
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      {avatar && (
        <>
          {position === "left" && !tail && <Blank />}
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
              <MessageReply message={repliedMessage} parent={props} />
            )}

            {position === "left" && title ? (
              <div
                style={{
                  marginBottom: 4,
                  color:
                    position === "left"
                      ? theme.palette.leftTitle
                      : theme.palette.rightTitle,
                }}
              >
                {" "}
                <Typography>{owner.name}</Typography>
              </div>
            ) : (
              ""
            )}

            <Typography
              color={
                position === "left"
                  ? theme.palette.onLeft
                  : theme.palette.onRight
              }
            >
              {text}
              <MessageMeta
                date={date}
                status={status}
                position={position}
                style={"text"}
                edited={edited ?? false}
              />
            </Typography>
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

const Blank = () => {
  return (
    <div
      style={{
        width: "30px",
        minWidth: "30px",
      }}
    />
  );
};

export default Message;
