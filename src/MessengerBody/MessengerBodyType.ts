import { MessageTextProps } from "../components";
import { MessageFileProps } from "../components";
import { MessageImageProps } from "../components";
import {
  MessageCoreProps,
  MessageOrder,
  MessageProps,
} from "../@types/message";

export interface MessengerBodyProps {
  threshold: number;
  title: boolean;
  typing: boolean;
  typingInfo?: string;
  avatar: boolean;
  pulling: boolean;
  loading: boolean;
  date: boolean;
  dateFormat: string;

  renderTextMessage: (
    message: MessageTextProps,
    order: MessageOrder
  ) => JSX.Element;
  renderImageMessage: (
    message: MessageImageProps,
    order: MessageOrder
  ) => JSX.Element;
  renderFileMessage: (
    message: MessageFileProps,
    order: MessageOrder
  ) => JSX.Element;
  renderAny: (message: MessageCoreProps, order: MessageOrder) => JSX.Element;
}
