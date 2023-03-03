import { Owner } from "../lib/@types/message";

export type UserNames =
  | "pasternak"
  | "me"
  | "mandelstam"
  | "brodsky"
  | "shakespeare";
export type User = { [key in "id" | "avatar" | "name"]: string };
export type UserObject = User & {
  generateMessage: (type: "text" | "files" | "file") => MessageProps;
};
export type Users = {
  [key in UserNames]: UserObject;
};

export type File = {
  id: string;
  type: "img" | "doc";
  title: string;
  url: string;
  secondary?: string;
};

export interface Image {
  id: string;
  title: string;
  url: string;
  width: number;
  height: number;
}

export type MessageCoreProps = {
  id: string;
  avatar?: string;
  status: MessageStatus;
  pending?: boolean;
  edited?: boolean;
  date: Date;
  dateFormat?: string;
  type: "text" | "file" | "img" | string; // string is stand for "any"
  repliedMessage?: MessageProps;
  owner: Owner;
  // getPosition: () => "right" | "left";
};

export enum MessageStatus {
  created,
  sent,
  delivered,
  read,
}

export type MessageProps =
  | MessageTextProps
  | MessageFileProps
  | MessageImageProps;

export interface MessageTextProps extends MessageCoreProps {
  text: string;
}

export interface MessageImageProps extends MessageCoreProps {
  caption?: string;
  images: Array<Image>;
}

export interface MessageFileProps extends MessageCoreProps {
  caption?: string;
  files: Array<File>;
}

export type MessengerProps = {
  threshold: number;
  title: boolean;
  typing: boolean;
  avatar: boolean;
  pulling: boolean;
  loading: boolean;
  date: boolean;
  dateFormat: string;
  onMessageSystemDateClick?: (date: Date) => void;
  onMessageClick?: (id: string) => void;
  onMessageDblClick?: (id: string) => void;
  onMessageItemClick?: (message: string, id: string | false) => void;
  onMessageLongTouch?: (id: string) => void;
  onPulled?: (id: string) => void;
  onMessageContext?: (id: string, messageItself?: boolean) => void;
  onEdgeReach?: () => void;
  renderTextMessage: (
    message: MessageTextProps,
    order: "start" | "end" | "middle" | "single"
  ) => JSX.Element;
  renderImageMessage: (
    message: MessageImageProps,
    order: "start" | "end" | "middle" | "single"
  ) => JSX.Element;
  renderFileMessage: (
    message: MessageFileProps,
    order: "start" | "end" | "middle" | "single"
  ) => JSX.Element;
  renderLoader: () => JSX.Element;
};
