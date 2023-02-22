import React, { FC } from "react";
import { useChat, useTheme } from "../../hooks";
import { getFileExtIcon } from "../../utils/helper";
import { borderByOrder } from "../../utils/theme";
import MessageMeta from "../MessageMeta";
import MessageReply from "../MessageReply";
import { MessageFileProps, File } from "./MessageFileType";
import { Avatar } from "../../elements";

const MessageFile: FC<
  MessageFileProps & {
    order: "start" | "end" | "middle" | "single";
  }
> = (props) => {
  const { files, order, id, date, position, repliedMessage, title } = props;
  const { icon, onClick, onLongClick } = useChat();
  const theme = useTheme();

  const tail = order === "end" || order === "single";

  return (
    <div className="rc-message-file_container">
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
        className="rc-message-file"
        style={{
          flexDirection: position === "left" ? "row-reverse" : "initial",
        }}
      >
        <div
          className="rc-message-file_body"
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
              <Files files={files} message={id} />
              <MessageMeta time={date} status={1} position={position} />
            </div>
          </div>
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

const Files: FC<{ files: Array<File> | undefined; message: string }> = (
  props
) => {
  const { files, message } = props;
  const theme = useTheme();
  const { onItemClick } = useChat();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: theme.space(0.3),
      }}
    >
      {files?.map((file, index) => {
        const { title, url, type, secondary } = file;

        return (
          <div
            onClick={() => {
              onItemClick(message, file.id);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: theme.space(1),
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              {type === "img" ? (
                <img
                  style={{
                    borderRadius: theme.space(1),
                    height: "40px",
                    width: "40px",
                    objectFit: "cover",
                  }}
                  alt={title}
                  src={url}
                />
              ) : (
                <img
                  style={{
                    borderRadius: theme.space(1),
                    height: "40px",
                    width: "40px",
                    objectFit: "cover",
                  }}
                  alt={title}
                  src={`/public/extension/${getFileExtIcon(title)}`}
                />
              )}
            </div>
            <div
              style={{
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
                  lineHeight: 1,
                  textOverflow: "ellipsis",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  opacity: theme.space(0.5),
                  lineHeight: 1,
                  textOverflow: "ellipsis",
                  fontSize: "10px",
                }}
              >
                {secondary ?? "type"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageFile;
