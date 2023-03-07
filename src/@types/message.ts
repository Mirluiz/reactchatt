import { MessageTextProps } from "../components";
import { MessageFileProps } from "../components";
import { MessageImageProps } from "../components";

export type Owner = {
  id: string;
  name: string;
  avatar: string;
};

export type MessageCoreProps = {
  id: string;
  status: MessageStatus;
  pending?: boolean;
  edited?: boolean;
  date: Date;
  dateFormat?: string;
  type: "text" | "file" | "img" | string; // string is stand for "any"
  repliedMessage?: MessageProps;
  owner: Owner;
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
