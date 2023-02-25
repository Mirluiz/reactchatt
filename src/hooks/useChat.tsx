import React, { useContext } from "react";

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatContext = React.createContext<{
  avatar: boolean;
  typing: boolean;
  onMessageSystemDateClick: (date: Date) => void;
  onClick: (id: string) => void;
  onLongTouch: (id: string) => void;
  onDblClick: (id: string) => void;
  onPulled: (id: string) => void;
  onItemClick: (message: string, id: string | false) => void;
  onEdgeReach: () => void;
}>({
  avatar: false,
  typing: false,
  onMessageSystemDateClick: (date: Date) => {},
  onClick: (id) => {},
  onLongTouch: (id) => {},
  onDblClick: (id) => {},
  onPulled: (id) => {},
  onItemClick: (message, id) => {},
  onEdgeReach: () => {},
});

export default useChat;
