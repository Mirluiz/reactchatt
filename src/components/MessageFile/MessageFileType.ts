import { MessageCoreProps } from "../../@types/message";

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
