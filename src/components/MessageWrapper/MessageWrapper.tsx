import React, { FC, useContext } from "react";
import { useChat } from "../../hooks";

const MessageWrapper: FC<{
  messageId: string;
  children: React.ReactNode;
}> = ({ messageId, children }) => {
  const { onMessageContext } = useChat();

  return (
    <div
      onContextMenu={(e) => {
        if (onMessageContext) {
          onMessageContext(messageId, true);
          e.preventDefault();
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
