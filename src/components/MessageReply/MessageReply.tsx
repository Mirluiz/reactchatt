import React, { FC } from "react";
import { isFile, isImage, isText } from "../../utils/guards";
import { MessageProps } from "../../@types/message";
import { Avatar, Typography } from "../../elements";

const Reply: FC<MessageProps> = (props) => {
  const { owner } = props;

  return (
    <div className="rc-message-reply_overflow">
      <div className="rc-message-reply_container">
        {isText(props) && (
          <div className="rc-message-reply_info">
            <div className="rc-message-reply_title">
              <Typography>{owner.name}</Typography>
            </div>
            <div className="rc-message-reply_text">
              <Typography>{props.text}</Typography>
            </div>
          </div>
        )}
        {isImage(props) && (
          <div className="rc-message-reply-image_info">
            <Avatar variant="square" img={props.images[0].url} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="rc-message-reply_title">{owner.name}</div>
              <div className="rc-message-reply_text">
                {props.images[0].title}
              </div>
            </div>
          </div>
        )}
        {isFile(props) && (
          <div className="rc-message-reply-image_info">
            <Avatar variant="square" img={props.files[0].url} />
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
                <Typography>{props.files[0].title}</Typography>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reply;
