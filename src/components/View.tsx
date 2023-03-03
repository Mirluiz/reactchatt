import React, { FC, useEffect, useState } from "react";
import { ReactChat } from "./../lib/index";
import useChat from "./context";
import { Box } from "@mui/material";
import "./view.css";

const View = () => {
  const {
    avatar,
    title,
    messages,
    loading,
    onMessageDblClick,
    onMessageClick,
    onMessageLongTouch,
    onTextChange,
    onPulled,
    onComposerReplyCancel,
    composerReplyMessage,
    onMessageItemClick,
    onEdgeReach,
    onMessageSystemDateClick,
    onSendClick,
    mode,
    themeMode,
  } = useChat();

  return (
    <>
      {mode === "mobile" ? (
        <div className="marvel-device iphone-x">
          <div className="notch">
            <div className="camera"></div>
            <div className="speaker"></div>
          </div>
          <div className="top-bar"></div>
          <div className="sleep"></div>
          <div className="bottom-bar"></div>
          <div className="volume"></div>
          <div className="overflow">
            <div className="shadow shadow--tr"></div>
            <div className="shadow shadow--tl"></div>
            <div className="shadow shadow--br"></div>
            <div className="shadow shadow--bl"></div>
          </div>
          <div className="inner-shadow"></div>
          <div className="screen">
            <div
              style={{
                position: "absolute",
                top: "30px",
                bottom: "0",
                left: "0",
                right: "0",
              }}
            >
              <ReactChat
                theme={
                  themeMode === "light"
                    ? {
                        palette: {
                          background: "#95c48a",
                          paper: "#fff",
                          onPaper: "black",
                          onPaperSecondary: "rgba(112,117,121,0.8)",
                          accent: "#e17076",
                          left: "#ffffff",
                          leftTitle: "#e17076",
                          onLeft: "#000000",
                          onLeftSecondary: "#95c48a",
                          right: "#eeffde",
                          rightTitle: "#6ec9cb",
                          onRight: "#000000",
                          onRightSecondary: "#4fae4e",
                        },
                      }
                    : {
                        palette: {
                          background: "#0f0f10",
                          paper: "#282828",
                          onPaper: "white",
                          accent: "#766AC8FF",
                          onPaperSecondary: "rgb(170,170,170)",
                          left: "#212121",
                          leftTitle: "#766AC8FF",
                          onLeft: "white",
                          onLeftSecondary: "rgb(170,170,170)",
                          right: "#766AC8FF",
                          rightTitle: "white",
                          onRight: "whitesmoke",
                          onRightSecondary: "whitesmoke",
                        },
                      }
                }
                title={title}
                avatar={avatar}
                messages={messages}
                me="1"
                loading={loading}
                onMessageDblClick={onMessageDblClick}
                onMessageClick={onMessageClick}
                onMessageLongTouch={onMessageLongTouch}
                onTextChange={onTextChange}
                onSendClick={onSendClick}
                onPulled={onPulled}
                onComposerReplyCancel={onComposerReplyCancel}
                onMessageItemClick={onMessageItemClick}
                onEdgeReach={onEdgeReach}
                onMessageSystemDateClick={onMessageSystemDateClick}
                composerReplyMessage={composerReplyMessage}
              />
            </div>
          </div>
        </div>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "812px",
          }}
        >
          <ReactChat
            theme={
              themeMode === "light"
                ? {
                    palette: {
                      background: "#95c48a",
                      paper: "#fff",
                      left: "#ffffff",
                      leftTitle: "#e17076",
                      onLeft: "#000000",
                      onLeftSecondary: "#95c48a",
                      right: "#eeffde",
                      rightTitle: "#6ec9cb",
                      onRight: "#000000",
                      onRightSecondary: "#4fae4e",
                    },
                  }
                : {
                    palette: {
                      background: "#95c48a",
                      paper: "#fff",
                      left: "#ffffff",
                      leftTitle: "#e17076",
                      onLeft: "#000000",
                      onLeftSecondary: "#95c48a",
                      right: "#eeffde",
                      rightTitle: "#6ec9cb",
                      onRight: "#000000",
                      onRightSecondary: "#4fae4e",
                    },
                  }
            }
            title={title}
            avatar={avatar}
            messages={messages}
            me="1"
            loading={loading}
            onMessageDblClick={onMessageDblClick}
            onMessageClick={onMessageClick}
            onMessageLongTouch={onMessageLongTouch}
            onTextChange={onTextChange}
            onSendClick={onSendClick}
            onPulled={onPulled}
            onComposerReplyCancel={onComposerReplyCancel}
            onMessageItemClick={onMessageItemClick}
            onEdgeReach={onEdgeReach}
            onMessageSystemDateClick={onMessageSystemDateClick}
            composerReplyMessage={composerReplyMessage}
          />
        </Box>
      )}
    </>
  );
};

export default View;
