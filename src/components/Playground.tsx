import React, { useState } from "react";
import ControlPanel from "./ControlPanel";
import View from "./View";
import { Box, Container, Grid } from "@mui/material";
import { MessageProps } from "./types";
import { ChatContext } from "./context";
import { uuid4 } from "./helper";
import { users } from "./Dummies";
import "./devices.css";
import { generateFake } from "./fake";
import { useChatApi } from "../lib/hooks/useChatApi";

const Playground = () => {
  const [messages, setMessages] = useState<Array<MessageProps>>([]);
  const [composerText, setComposerText] = useState<string>("");
  const [avatar, setAvatar] = useState<boolean>(true);
  const [title, setTitle] = useState<boolean>(false);
  const [days, setDays] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [composerReplyMessage, setComposerReplyMessage] =
    useState<MessageProps>();
  const [mode, setMode] = useState<"mobile" | "web">("mobile");
  const [themeMode, setThemeMode] = useState<"dark" | "light">("light");

  const { scrollTo, highlightMessage } = useChatApi();

  const addMessage = (text: string) => {
    let newMessage: MessageProps = {
      date: new Date(),
      edited: false,
      id: uuid4(),
      pending: false,
      status: 1,
      text: text,
      type: "text",
      owner: users.me,
    };

    messages.push(newMessage);
    setMessages([...messages]);
  };

  return (
    <ChatContext.Provider
      value={{
        mode: mode,
        themeMode: themeMode,
        updateThemeMode: () => {
          setThemeMode(themeMode === "light" ? "dark" : "light");
        },
        updateMode: (m) => {
          setMode(m);
        },
        loading: loading,
        days: days,
        avatar: avatar,
        title: title,
        messages: messages,
        updateAvatar: () => {
          setAvatar(!avatar);
        },
        updateLoading: () => {
          setLoading(!loading);
        },
        updateDays: () => {
          setDays(!days);
        },
        updateTitle: () => {
          setTitle(!title);
        },
        addNewMessage: (newMessage: MessageProps) => {
          messages.push(newMessage);
          setMessages([...messages]);
        },
        onTextChange: (text: string) => {
          setComposerText(text);
        },
        onMessageDblClick: () => {},
        onSendClick: () => {
          addMessage(composerText);
          setComposerText("");
        },
        onEdgeReach: () => {},
        onMessageClick: () => {},
        onMessageItemClick: () => {},
        onMessageLongTouch: () => {},
        onMessageSystemDateClick: () => {},
        onPulled: () => {},
        clearChat: () => {
          setMessages([]);
        },
        generateFake: (amount) => {
          setMessages([]);
          setMessages(generateFake(amount));
        },
        scrollTo: (index) => {
          scrollTo(messages[index].id);
        },
        highlight: (index) => {
          highlightMessage(messages[index].id);
        },
        reply: (index) => {
          let msg = messages[index];
          if (msg) setComposerReplyMessage(msg);
        },
        composerReplyMessage: composerReplyMessage,
        onComposerReplyCancel: () => {
          setComposerReplyMessage(undefined);
        },
      }}
    >
      <Grid
        container
        sx={{
          border: "2px solid whitesmoke",
        }}
      >
        <Grid
          item
          md={5}
          sx={{
            borderRight: "2px solid whitesmoke",
          }}
        >
          <ControlPanel />
        </Grid>
        <Grid
          item
          md={7}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <View />
        </Grid>
      </Grid>
    </ChatContext.Provider>
  );
};

export default Playground;
