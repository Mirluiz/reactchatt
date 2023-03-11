import React, { FC } from "react";
export const ReactChat: FC<MessengerProps> = (props) => JSX.Element;

interface MessengerProps {
  threshold?: number;
  title?: boolean;
  typing?: boolean;
  typingInfo?: string;
  avatar?: boolean;
  pulling?: boolean;
  loading?: boolean;
  date?: boolean;
  dateFormat?: string;

  renderTextMessage?: (
    message: MessageTextProps,
    order: MessageOrder
  ) => JSX.Element;
  renderImageMessage?: (
    message: MessageImageProps,
    order: MessageOrder
  ) => JSX.Element;
  renderFileMessage?: (
    message: MessageFileProps,
    order: MessageOrder
  ) => JSX.Element;
  renderAny?: (message: MessageCoreProps, order: MessageOrder) => JSX.Element;

  days?: boolean;
  me?: string;
  messages?: Array<MessageProps>;

  theme?: {
    spacing?: number;
    shape?: {
      borderRadius?: number;
    };
    space?: (v: number) => string;
    palette?: Partial<PaletteProps>;
    typography?: Partial<TypographyProps>;
  };
  onMessageSystemDateClick?: (date: Date) => void;
  onMessageClick?: (id: string) => void;
  onMessageDblClick?: (id: string) => void;
  onMessageItemClick?: (message: string, id: string | false) => void;
  onMessageLongTouch?: (id: string) => void;
  onPulled?: (id: string) => void;
  onMessageContext?: (id: string, messageItself?: boolean) => void;
  onReplyMessageClick?: (messageId: string, parentId?: string) => void;
  onEdgeReach?: () => void;
  composerReplyMessage?: MessageProps | undefined;
  placeholder?: string;
  onFocus?: () => void;
  onTextChange?: (text: string) => void;
  onAttachmentChange?: () => void;
  onSendClick?: () => void;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  onComposerReplyCancel?: () => void;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  sendIcon?: JSX.Element;
}

type Owner = {
  id: string;
  name: string;
  avatar: string;
};

type MessageCoreProps = {
  id: string;
  status: MessageStatus;
  edited?: boolean;
  date: Date;
  dateFormat?: string;
  type: "text" | "file" | "img" | "any";
  repliedMessage?: MessageProps;
  owner: Owner;
};

enum MessageStatus {
  created,
  pending,
  sent,
  read,
  error,
}

type MessageProps =
  | MessageCoreProps
  | MessageTextProps
  | MessageFileProps
  | MessageImageProps;

type MessageOrder = "start" | "end" | "middle" | "single";

interface MessageTextProps extends MessageCoreProps {
  text: string;
}

export interface File {
  id: string;
  type: "img" | "doc";
  title: string;
  url: string;
  secondary?: string;
}

export interface MessageFileProps extends MessageCoreProps {
  caption?: string;
  files: Array<File>;
}

export interface Image {
  id: string;
  title: string;
  url: string;
  width: number;
  height: number;
}

export interface MessageImageProps extends MessageCoreProps {
  caption?: string;
  images: Array<Image>;
}

interface PaletteProps {
  right: string;
  rightTitle: string;
  onRight: string;
  onRightSecondary: string;
  left: string;
  leftTitle: string;
  onLeft: string;
  onLeftSecondary: string;
  background: string;
  onBackground: string;
  contrast: string;
  onContrast: string;
  composer: string;
  onComposer: string;
  accent: string;
  onAccent: string;
  text: string;
  reply: string;
  onReply: string;
}

interface TypographyProps {
  fontSize: string;
  fontFamily: string;
}
