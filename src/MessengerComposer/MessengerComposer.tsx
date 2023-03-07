import React, { FC, useRef, memo, useEffect } from "react";
import Reply from "../components/MessageReply";
import IconButton from "../elements/IconButton";
import { useTheme } from "../hooks";
import { MessengerComposerProps } from "./MessengerComposerType";
import { tail } from "../assets/icons";

const MessengerComposer: FC<MessengerComposerProps> = (props) => {
  const {
    onLeftIconClick,
    onRightIconClick,
    leftIcon,
    rightIcon,
    sendIcon,
    onAttachmentChange,
    onTextChange,
    onFocus,
    placeholder,
    onSendClick,
    onComposerReplyCancel,
    composerReplyMessage,
  } = props;

  const composerRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hiddenInputRef = useRef<HTMLTextAreaElement>(null);
  const theme = useTheme();

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      textAreaAdjust();
    }
  };

  function textAreaAdjust() {
    if (!inputRef.current || !hiddenInputRef.current) return;
    const element = inputRef.current;
    const hidden = hiddenInputRef.current;
    hidden.value = element.value;
    const height = hidden.scrollHeight;
    element.style.height = (height / 25) * 25 + "px";
  }

  return (
    <div className="rc-composer">
      <div className="rc-composer__left">
        {composerReplyMessage && (
          <div className="rc-composer-replyMessage">
            <Reply message={composerReplyMessage} />
            <IconButton
              onClick={() => onComposerReplyCancel && onComposerReplyCancel()}
            >
              <svg
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="HighlightOffOutlinedIcon"
              >
                <path d="M14.59 8 12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
              </svg>
            </IconButton>
          </div>
        )}
        <div ref={composerRef} className="rc-composer__main">
          <div className="rc-left__icon">
            <IconButton onClick={() => onLeftIconClick && onLeftIconClick()}>
              {leftIcon}
            </IconButton>
          </div>
          <div className="rc-composer_textarea">
            <textarea className="rc-textarea_hidden" ref={hiddenInputRef} />
            <textarea
              ref={inputRef}
              className="rc-textarea"
              placeholder={placeholder ?? "Write"}
              onChange={(e) => {
                textAreaAdjust();
                onTextChange && onTextChange(e.target.value);
              }}
              onKeyUp={() => textAreaAdjust()}
            />
          </div>
          <div
            style={{
              flexGrow: 0.1,
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <IconButton onClick={() => onRightIconClick && onRightIconClick()}>
              {rightIcon}
            </IconButton>
          </div>

          <div
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "flex-end",
              right: "-7.4px",
            }}
          >
            {tail(theme.palette.composer, "right")}
          </div>
        </div>
      </div>

      <div className="rc-send__icon">
        <IconButton
          color={theme.palette.accent}
          onClick={() => {
            clearInput();
            onSendClick && onSendClick();
          }}
        >
          {sendIcon}
        </IconButton>
      </div>
    </div>
  );
};

export default memo(MessengerComposer);
