import { MessageProps } from "../@types/message";

export interface MessengerComposerProps {
  composerReplyMessage: MessageProps | undefined;
  placeholder: string;
  onFocus?: () => void;
  onTextChange?: (text: string) => void;
  onAttachmentChange?: () => void;
  onSendClick?: () => void;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  onComposerReplyCancel?: () => void;
  leftIcon: JSX.Element;
  rightIcon: JSX.Element;
  sendIcon: JSX.Element;
}
