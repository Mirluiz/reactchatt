import React, { FC } from "react";
import { useChat, useTheme } from "../../hooks";
import { getFileExtIcon } from "../../utils/helper";
import { borderByOrder } from "../../utils/theme";
import MessageMeta from "../MessageMeta";
import MessageReply from "../MessageReply";
import { MessageFileProps, File } from "./MessageFileType";
import { Avatar, Typography } from "../../elements";

const MessageFile: FC<
  MessageFileProps & {
    order: "start" | "end" | "middle" | "single";
  }
> = (props) => {
  const {
    files,
    order,
    id,
    date,
    position,
    repliedMessage,
    title,
    avatar: userAvatar,
    caption,
    status,
  } = props;
  const { avatar, onMessageClick, onMessageLongTouch } = useChat();
  const theme = useTheme();

  const tail = order === "end" || order === "single";

  return (
    <div
      className="rc-message-file_container"
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
            <Avatar img={userAvatar} name={title} />
          )}
        </>
      )}
      <div className="rc-message-file">
        <div
          className="rc-message-file_body"
          style={{
            flexDirection: "column-reverse",
            backgroundColor:
              position === "left" ? theme.palette.left : theme.palette.right,
            ...borderByOrder(theme, position, order),
          }}
        >
          {caption && (
            <div
              style={{
                marginTop: "4px",
                width: "100%",
              }}
            >
              {caption}
              <MessageMeta
                date={date}
                status={1}
                position={position}
                style={"text"}
              />
            </div>
          )}

          {repliedMessage && (
            <div style={{ paddingBottom: ".4rem" }}>
              <MessageReply {...repliedMessage} />
            </div>
          )}

          <Files files={files} message={id} position={position} />
          {!caption && (
            <div
              style={{
                width: "100%",
              }}
            >
              <MessageMeta
                date={date}
                status={status}
                position={position}
                style={"file"}
              />
            </div>
          )}
        </div>
        {tail && (
          <div
            className={`rc-message-file-tail ${
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

const Files: FC<{
  files: Array<File> | undefined;
  message: string;
  position: "left" | "right";
}> = (props) => {
  const { files, message, position } = props;
  const theme = useTheme();
  const { onMessageItemClick } = useChat();

  return (
    <div
      style={{
        width: "100%",
        cursor: "pointer",
        display: "inline-flex",
        flexDirection: "column",
        gap: theme.space(0.5),
      }}
    >
      {files?.map((file, index) => {
        return <_File file={file} message={message} position={position} />;
      })}
    </div>
  );
};

const _File: FC<{
  file: File;
  message: string;
  position: "left" | "right";
}> = (props) => {
  const { file, message, position } = props;
  const theme = useTheme();
  const { onMessageItemClick } = useChat();

  return (
    <div
      onClick={(e) => {
        if (onMessageItemClick) {
          onMessageItemClick(message, file.id);
          e.stopPropagation();
        }
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: theme.space(1),
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        {file.type === "img" ? (
          <img
            style={{
              borderRadius: theme.space(1),
              height: "40px",
              width: "40px",
              objectFit: "cover",
            }}
            alt={file.title}
            src={file.url}
          />
        ) : (
          <img
            style={{
              borderRadius: theme.space(1),
              height: "40px",
              width: "40px",
              objectFit: "cover",
            }}
            alt={file.title}
            src={`/public/extension/${getFileExtIcon(file.title)}`}
          />
        )}
      </div>
      <div
        style={{
          maxWidth: "150px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 0.5,
          paddingRight: 2,
        }}
      >
        <div
          style={{
            fontSize: "16px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={file.title}
        >
          {file.title}
        </div>
        <div
          style={{
            opacity: theme.space(0.5),
            lineHeight: 1,
            textOverflow: "ellipsis",
            fontSize: "10px",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <Typography
            size={"es"}
            color={
              position === "left"
                ? theme.palette.onLeftSecondary
                : theme.palette.onRightSecondary
            }
          >
            {file.size}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default MessageFile;
