import React, { useContext } from "react";
import { PartialMessengerProps } from "../Messenger";
import { MessageProps } from "../@types/message";

const useChat = () => {
  return useContext(ChatContext);
};

export const ChatContext = React.createContext<{
  props: PartialMessengerProps;
  getPosition: (m: MessageProps) => "left" | "right";
}>({
  props: {},
  getPosition: () => "left",
});

export default useChat;
