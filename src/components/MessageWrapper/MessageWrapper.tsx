import React, { FC, useContext } from "react";
import { useChat } from "../../hooks";

const MessageWrapper: FC<{
  messageId: string;
  children: React.ReactNode;
}> = ({ messageId, children }) => {
  const { onMessageContext } = useChat().props;

  return (
    <div
      onContextMenu={(e) => {
        if (onMessageContext) {
          onMessageContext(messageId, true);
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      style={{
        maxWidth: "70%",
      }}
    >
      {children}
    </div>
  );
};

export default MessageWrapper;
