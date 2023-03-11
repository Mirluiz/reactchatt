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
import { MessageOrder } from "../@types/message";
import { ErrorBoundary } from "../boundaries";

const Messenger: FC<
  PartialMessengerProps & {
    theme?: ThemeOptions;
  }
> = (props) => {
  const renderTextMessage = useCallback(
    (message: MessageTextProps, order: MessageOrder) => {
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
    (message: MessageImageProps, order: MessageOrder) => {
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
    (message: MessageFileProps, order: MessageOrder) => {
      return (
        (props?.renderFileMessage &&
          props.renderFileMessage(message, order)) ?? (
          <MessageFile {...message} order={order} />
        )
      );
    },
    []
  );

  useEffect(() => {
    setThemeToDocument(props.theme, document);
    ejectStyles(document);
  }, [props.theme]);

  return (
    <ErrorBoundary>
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
                typingInfo={props.typingInfo ?? props.typingInfo}
                date={props?.date ?? true}
                dateFormat={props?.dateFormat ?? "MMMM D"}
                title={props?.title ?? false}
                avatar={props?.avatar ?? true}
                pulling={props?.pulling ?? true}
                loading={props?.loading ?? false}
                renderTextMessage={renderTextMessage}
                renderImageMessage={renderImageMessage}
                renderFileMessage={renderFileMessage}
                renderAny={props?.renderAny ?? (() => <></>)}
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
    </ErrorBoundary>
  );
};

export default memo(Messenger);
