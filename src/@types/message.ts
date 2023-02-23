import { MessageTextProps } from "../components";
import { MessageFileProps } from "../components";
import { MessageImageProps } from "../components";

export type MessageCoreProps = {
  id: string;
  title: string;
  avatar?: string;
  position: "left" | "right";
  status: MessageStatus;
  pending?: boolean;
  edited?: boolean;
  date: Date;
  dateFormat?: string;
  type: "text" | "file" | "img" | string; // string is stand for "any"
  repliedMessage?: MessageProps;
  owner: string;
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
