import React, { ChangeEventHandler, FC, useEffect } from "react";
import moment from "moment";
import { useChat } from "../../hooks";
import { Typography } from "../../elements";

type Props = {
  date: Date;
  format: string;
};

const Message: FC<Props> = ({ date, format }) => {
  const { onMessageSystemDateClick } = useChat();

  return (
    <div
      className="rc-message-system-container"
      onClick={(e) => {
        if (onMessageSystemDateClick) {
          onMessageSystemDateClick(date);
          e.stopPropagation();
        }
      }}
    >
      <div className="rc-message-system-date">
        <Typography size={"s"}>{moment(date).format(format)}</Typography>
      </div>
    </div>
  );
};

export default Message;
