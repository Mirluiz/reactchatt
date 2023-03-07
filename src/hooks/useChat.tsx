import React, { useContext } from "react";
import { PartialMessengerProps } from "../Messenger";
import { MessageProps } from "../@types/message";
import { ThemeOptions } from "../@types/theme";

const useChat = () => {
  return useContext(ChatContext);
};

export const ChatContext = React.createContext<{
  props: PartialMessengerProps;
  getPosition: (m: MessageProps) => "left" | "right";
  days: boolean;
}>({
  props: {},
  getPosition: () => "left",
  days: true,
});

export default useChat;
