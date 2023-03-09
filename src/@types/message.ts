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
  edited?: boolean;
  date: Date;
  dateFormat?: string;
  type: "text" | "file" | "img" | "any";
  repliedMessage?: MessageProps;
  owner: Owner;
};

export enum MessageStatus {
  created,
  pending,
  sent,
  read,
  error,
}

export type MessageProps =
  | MessageCoreProps
  | MessageTextProps
  | MessageFileProps
  | MessageImageProps;

export type MessageOrder = "start" | "end" | "middle" | "single";
