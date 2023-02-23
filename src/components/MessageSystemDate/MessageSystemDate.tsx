import React, { ChangeEventHandler, FC, useEffect } from "react";
import moment from "moment";

type Props = {
  date: Date;
  format: string;
};

const Message: FC<Props> = ({ date, format }) => {
  return (
    <div className="rc-message-system-container">
      <div className="rc-message-system-date">
        {moment(date).format(format)}
      </div>
    </div>
  );
};

export default Message;
