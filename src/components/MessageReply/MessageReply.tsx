import React, { FC } from "react";
import { isFile, isImage, isText } from "../../utils/guards";
import { MessageProps } from "../../@types/message";
import { Avatar, Typography } from "../../elements";
import { useChat, useTheme } from "../../hooks";
import { getFileExtIcon } from "../../utils/helper";

const Reply: FC<{
  parent?: MessageProps; // undefined when reply on composer
  message: MessageProps;
}> = (props) => {
  const { parent, message } = props;
  const { owner, id } = message;
  const { props: globalProps } = useChat();
  const { onReplyMessageClick } = globalProps;

  return (
    <div
      className="rc-message-reply_overflow"
      onClick={(e) => {
        if (onReplyMessageClick) {
          onReplyMessageClick(id, parent?.id);
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <div className="rc-message-reply_container">
        {isText(message) && (
          <div className="rc-message-reply_info">
            <div className="rc-message-reply_title">
              <Typography>{owner.name}</Typography>
            </div>
            <div className="rc-message-reply_text">
              <Typography>{message.text}</Typography>
            </div>
          </div>
        )}
        {isImage(message) && (
          <div className="rc-message-reply-image_info">
            <ReplyMessageImage
              title={message.images[0].title}
              url={message.images[0].url}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="rc-message-reply_title">
                <Typography>{owner.name}</Typography>
              </div>
              <div className="rc-message-reply_text">
                <Typography>{message.images[0].title}</Typography>
              </div>
            </div>
          </div>
        )}
        {isFile(message) && (
          <div className="rc-message-reply-image_info">
            <ReplyMessageFile
              title={message.files[0].title}
              url={message.files[0].url}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="rc-message-reply_title">
                <Typography>{owner.name}</Typography>
              </div>
              <div className="rc-message-reply_text">
                <Typography>{message.files[0].title}</Typography>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ReplyMessageImage: FC<{
  url: string;
  title: string;
}> = (props) => {
  const { space } = useTheme();
  const { url, title } = props;

  return (
    <div
      style={{
        width: 40,
        marginRight: space(0.5),
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src={url}
          alt={title}
        />
      </div>
    </div>
  );
};

const ReplyMessageFile: FC<{
  url: string;
  title: string;
}> = (props) => {
  const { space } = useTheme();
  const { url, title } = props;

  return (
    <div
      style={{
        width: 40,
        marginRight: space(0.5),
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
          }}
          src={`/extension/${getFileExtIcon(title)}`}
          alt={title}
        />
      </div>
    </div>
  );
};

export default Reply;
