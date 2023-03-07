import { MessageTextProps } from "../components";
import { MessageFileProps } from "../components";
import { MessageImageProps } from "../components";

export interface MessengerBodyProps {
  threshold: number;
  title: boolean;
  typing: boolean;
  avatar: boolean;
  pulling: boolean;
  loading: boolean;
  date: boolean;
  dateFormat: string;

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
}
