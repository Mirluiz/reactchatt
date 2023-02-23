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
import { setThemeToDocument } from "../utils/theme";
import { MessageTextProps } from "../components";
import { MessageImageProps } from "../components";
import { MessageFileProps } from "../components";
import { ejectStyles } from "../utils/style";
import { PartialMessengerProps } from "./MessengerType";

const Messenger: FC<
  PartialMessengerProps & {
    theme?: ThemeOptions;
  }
> = (props) => {
  const [themeInit, setThemeInit] = useState<boolean>(false);

  const onMessageClick = useCallback((id: string) => {
    props?.onMessageClick && props.onMessageClick(id);
  }, []);

  const onMessageDblClick = useCallback((id: string) => {
    props?.onMessageDblClick && props?.onMessageDblClick(id);
  }, []);

  const onMessageItemClick = useCallback((message: string, id: string) => {
    props?.onMessageItemClick && props?.onMessageItemClick(message, id);
  }, []);

  const onMessageLongClick = useCallback((id: string) => {
    props?.onMessageLongClick && props?.onMessageLongClick(id);
  }, []);

  const onPulled = useCallback((id: string) => {
    props?.onPulled && props?.onPulled(id);
  }, []);

  const onMessageContext = useCallback((id: string) => {
    props?.onMessageContext && props?.onMessageContext(id);
  }, []);

  const onEdgeReach = useCallback(() => {
    props?.onEdgeReach && props?.onEdgeReach();
  }, []);

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
    setThemeInit(true);
    ejectStyles(document);
  }, [props.theme]);

  return (
    <ChatContext.Provider
      value={{
        avatar: props.avatar ?? true,
        onClick: (id) => {
          props.onMessageClick && props.onMessageClick(id);
        },
        onLongClick: (id) => {
          props.onMessageLongClick && props.onMessageLongClick(id);
        },
        onDblClick: (id) => {
          props.onMessageDblClick && props.onMessageDblClick(id);
        },
        typing: props.typing ?? false,
        onPulled: (id) => {
          props.onPulled && props.onPulled(id);
        },
        onItemClick: (message, id) => {
          props.onMessageItemClick && props.onMessageItemClick(message, id);
        },
        onEdgeReach: () => {
          props.onEdgeReach && props.onEdgeReach();
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
            onMessageClick={onMessageClick}
            onMessageDblClick={onMessageDblClick}
            onMessageItemClick={onMessageItemClick}
            onMessageLongClick={onMessageLongClick}
            onPulled={onPulled}
            onMessageContext={onMessageContext}
            onEdgeReach={onEdgeReach}
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
  );
};

export default memo(Messenger);
