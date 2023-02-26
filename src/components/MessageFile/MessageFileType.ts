import { MessageCoreProps } from "../../@types/message";

export interface File {
  id: string;
  type: "img" | "doc";
  title: string;
  url: string;
  size?: string;
}

export interface MessageFileProps extends MessageCoreProps {
  caption?: string;
  needTitle?: boolean;
  files: Array<File>;
}
