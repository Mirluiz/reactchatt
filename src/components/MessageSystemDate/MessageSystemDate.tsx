import React, { ChangeEventHandler, FC, useEffect } from "react";
import moment from "moment";
import { useChat } from "../../hooks";

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
        onMessageSystemDateClick(date);
        e.stopPropagation();
      }}
    >
      <div className="rc-message-system-date">
        {moment(date).format(format)}
      </div>
    </div>
  );
};

export default Message;
