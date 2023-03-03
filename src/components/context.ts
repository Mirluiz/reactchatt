import React, { useContext } from "react";
import {
  MessageFileProps,
  MessageImageProps,
  MessageProps,
  MessageTextProps,
} from "./types";

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatContext = React.createContext<{
  themeMode: "dark" | "light";
  updateThemeMode: () => void;
  mode: "mobile" | "web";
  updateMode: (m: "mobile" | "web") => void;

  avatar: boolean;
  title: boolean;
  days: boolean;
  messages: Array<MessageProps>;
  addNewMessage: (m: MessageProps) => void;
  loading: boolean;

  updateDays: () => void;
  updateLoading: () => void;
  updateAvatar: () => void;
  updateTitle: () => void;

  clearChat: () => void;

  onMessageDblClick: () => void;
  onMessageClick: () => void;
  onMessageLongTouch: () => void;
  onTextChange: (text: string) => void;
  onSendClick: () => void;
  onPulled: () => void;
  onComposerReplyCancel: () => void;
  composerReplyMessage?: MessageProps;

  onMessageItemClick: () => void;
  onEdgeReach: () => void;
  onMessageSystemDateClick: () => void;

  generateFake: (amount: number) => void;

  reply: (id: number) => void;
  scrollTo: (i: number) => void;
  highlight: (i: number) => void;
}>({
  themeMode: "light",
  updateThemeMode: () => {},
  mode: "mobile",
  updateMode: () => {},
  avatar: true,
  days: true,
  title: false,
  messages: [],
  loading: false,
  addNewMessage: (m) => {},
  updateAvatar: () => {},
  updateTitle: () => {},
  updateLoading: () => {},
  updateDays: () => {},
  clearChat: () => {},
  onMessageDblClick: () => {},
  onMessageClick: () => {},
  onMessageLongTouch: () => {},
  onTextChange: () => {},
  onSendClick: () => {},
  onPulled: () => {},
  onComposerReplyCancel: () => {},
  onMessageItemClick: () => {},
  onEdgeReach: () => {},
  onMessageSystemDateClick: () => {},
  composerReplyMessage: undefined,
  generateFake: () => {},
  reply: () => {},
  scrollTo: () => {},
  highlight: () => {},
});

export default useChat;
