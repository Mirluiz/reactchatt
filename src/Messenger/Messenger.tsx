import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MessengerBody, MessengerComposer } from "../index";
import { ChatContext } from "../hooks/useChat";
import { leftIcon, rightIcon, sendIcon } from "../assets/icons";
import { Message, MessageFile, MessageImage } from "../components";
import { Loader } from "../elements";
import { ThemeOptions } from "../@types/theme";
import { setTheme, setThemeToDocument } from "../utils/theme";
import { MessageTextProps } from "../components";
import { MessageImageProps } from "../components";
import { MessageFileProps } from "../components";
import { ejectStyles } from "../utils/style";
import { PartialMessengerProps } from "./MessengerType";
import { ThemeContext } from "../hooks";

const Messenger: FC<
  PartialMessengerProps & {
    theme?: ThemeOptions;
  }
> = (props) => {
  const renderTextMessage = useCallback(
    (
      message: MessageTextProps,
      order: "start" | "end" | "middle" | "single"
    ) => {
      return (
        (props?.renderTextMessage &&
          props.renderTextMessage(message, order)) ?? (
          <Message {...message} order={order} />
        )
      );
    },
    []
  );

  const renderImageMessage = useCallback(
    (
      message: MessageImageProps,
      order: "start" | "end" | "middle" | "single"
    ) => {
      return (
        (props?.renderImageMessage &&
          props.renderImageMessage(message, order)) ?? (
          <MessageImage {...message} order={order} />
        )
      );
    },
    []
  );

  const renderFileMessage = useCallback(
    (
      message: MessageFileProps,
      order: "start" | "end" | "middle" | "single"
    ) => {
      return (
        (props?.renderFileMessage &&
          props.renderFileMessage(message, order)) ?? (
          <MessageFile {...message} order={order} />
        )
      );
    },
    []
  );

  const renderLoader = useCallback(() => {
    return (props?.renderLoader && props.renderLoader()) ?? <Loader />;
  }, []);

  useEffect(() => {
    setThemeToDocument(props.theme, document);
    ejectStyles(document);
  }, [props.theme]);

  return (
    <ThemeContext.Provider value={setTheme(props.theme)}>
      <ChatContext.Provider
        value={{
          days: props.days !== undefined ? props.days : true,
          getPosition: (m) => {
            return m.owner.id === props.me ? "right" : "left";
          },
          props: {
            ...props,
            avatar: props.avatar !== undefined ? props.avatar : true,
            title: props.title !== undefined ? props.title : true,
          },
        }}
      >
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
          }}
        >
          <div className="reactchat">
            <MessengerBody
              threshold={props?.threshold ?? 0}
              typing={props?.typing ?? false}
              date={props?.date ?? true}
              dateFormat={props?.dateFormat ?? "MMMM D"}
              title={props?.title ?? false}
              avatar={props?.avatar ?? true}
              pulling={props?.pulling ?? true}
              loading={props?.loading ?? false}
              renderTextMessage={renderTextMessage}
              renderImageMessage={renderImageMessage}
              renderFileMessage={renderFileMessage}
              renderLoader={renderLoader}
              messages={props?.messages ?? []}
            />
            <MessengerComposer
              placeholder={props?.placeholder ?? "Write"}
              onFocus={props.onFocus}
              onTextChange={props.onTextChange}
              onAttachmentChange={props.onAttachmentChange}
              onSendClick={props.onSendClick}
              onLeftIconClick={props.onLeftIconClick}
              onRightIconClick={props.onRightIconClick}
              onComposerReplyCancel={props.onComposerReplyCancel}
              leftIcon={props?.leftIcon ?? leftIcon}
              rightIcon={props?.rightIcon ?? rightIcon}
              sendIcon={props?.sendIcon ?? sendIcon}
              composerReplyMessage={props?.composerReplyMessage}
            />
          </div>
        </div>
      </ChatContext.Provider>
    </ThemeContext.Provider>
  );
};

export default memo(Messenger);
