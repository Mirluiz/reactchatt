import React, { FC, useMemo } from "react";
import { useChat, useTheme } from "../../hooks";
import { getFileExtIcon } from "../../utils/helper";
import { borderByOrder } from "../../utils/theme";
import MessageMeta from "../MessageMeta";
import MessageReply from "../MessageReply";
import { MessageFileProps, File } from "./MessageFileType";
import { Avatar, Typography } from "../../elements";
import message from "../Message";
import { tail as tailFN } from "../../assets/icons";

const MessageFile: FC<
  MessageFileProps & {
    order: "start" | "end" | "middle" | "single";
  }
> = (props) => {
  const { files, order, id, date, caption, status, owner, edited } = props;
  const { getPosition, props: globalProps } = useChat();
  const { avatar, onMessageClick, title } = globalProps;
  const theme = useTheme();
  const tail = useMemo(() => {
    return order === "end" || order === "single";
  }, [order]);
  const position = useMemo(() => {
    return getPosition(props);
  }, [props]);

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
          {position === "left" && !tail && <Blank />}
          {position === "left" && tail && (
            <Avatar img={owner.avatar} name={owner.name} />
          )}
        </>
      )}
      <div className="rc-message-file">
        <div
          className="rc-message-file_body"
          style={{
            backgroundColor:
              position === "left" ? theme.palette.left : theme.palette.right,
            ...borderByOrder(theme, position, order),
          }}
        >
          <Files files={files} position={position} message={props} />
          {!caption && (
            <MessageMeta
              date={date}
              status={status}
              position={position}
              style={"file"}
              edited={edited ?? false}
            />
          )}
          {caption && (
            <Typography
              color={
                position === "left"
                  ? theme.palette.onLeft
                  : theme.palette.onRight
              }
            >
              {caption}
              <MessageMeta
                date={date}
                status={status}
                position={position}
                style={"text"}
                edited={edited ?? false}
              />
            </Typography>
          )}

          <div>
            <div
              style={{
                marginBottom: "2px",
                color:
                  position === "left"
                    ? theme.palette.leftTitle
                    : theme.palette.rightTitle,
              }}
            >
              {position === "left" && title ? (
                <Typography>{owner.name}</Typography>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {tail && (
          <div
            className={`rc-message-file-tail ${
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

const Files: FC<{
  files: Array<File> | undefined;
  message: MessageFileProps;
  position: "left" | "right";
}> = (props) => {
  const { files, message, position } = props;

  return (
    <div className={"rc-message-files"}>
      {files?.map((file, index) => {
        return (
          <_File
            key={file.id}
            file={file}
            message={message}
            position={position}
          />
        );
      })}
    </div>
  );
};

const _File: FC<{
  file: File;
  message: MessageFileProps;
  position: "left" | "right";
}> = (props) => {
  const { file, message, position } = props;
  const theme = useTheme();
  const { onMessageItemClick } = useChat().props;

  return (
    <div
      className={"rc-message-file_element"}
      onClick={(e) => {
        if (onMessageItemClick) {
          onMessageItemClick(message.id, file.id);
          e.stopPropagation();
        }
      }}
    >
      <div className={"rc-message-file-doc"}>
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
              objectFit: "fill",
            }}
            alt={file.title}
            src={`/extension/${getFileExtIcon(file.title)}`}
          />
        )}
      </div>
      <div className={"rc-message-file-text"}>
        <Typography
          size={"m"}
          title={file.title}
          color={
            position === "left" ? theme.palette.onLeft : theme.palette.onRight
          }
        >
          {file.title}
        </Typography>
        <Typography
          size={"s"}
          color={
            position === "left"
              ? theme.palette.onLeftSecondary
              : theme.palette.onRightSecondary
          }
        >
          {file.secondary}
        </Typography>
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
export default MessageFile;
