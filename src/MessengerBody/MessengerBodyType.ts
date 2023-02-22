import { MessageTextProps } from "../components";
import { MessageFileProps } from "../components";
import { MessageImageProps } from "../components";

export interface MessengerBodyProps {
  threshold: number;
  title: boolean;
  typing: boolean;
  icon: boolean;
  pulling: boolean;
  loading: boolean;
  onMessageClick?: (id: string) => void;
  onMessageDblClick?: (id: string) => void;
  onMessageItemClick?: (message: string, id: string) => void;
  onMessageLongClick?: (id: string) => void;
  onPulled?: (id: string) => void;
  onMessageContext?: (id: string) => void;
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
}
