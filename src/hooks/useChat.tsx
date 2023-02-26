import React, { useContext } from "react";
import { PartialMessengerProps } from "../Messenger";

export const useChat = () => {
  let { props } = useContext(ChatContext);
  return props!;
};

export const ChatContext = React.createContext<{
  props: null | PartialMessengerProps;
}>({
  props: null,
});

export default useChat;
