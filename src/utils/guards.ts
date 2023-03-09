import { MessageCoreProps, MessageProps } from "../@types/message";
import { MessageTextProps } from "../components/Message/MessageType";
import { MessageFileProps } from "../components/MessageFile/MessageFileType";
import { MessageImageProps } from "../components/MessageImage/MessageImageType";

export const isFile = (object: MessageProps): object is MessageFileProps => {
  return object.type === "file";
};

export const isImage = (object: MessageProps): object is MessageImageProps => {
  return object.type === "img";
};

export const isText = (object: MessageProps): object is MessageTextProps => {
  return object.type === "text";
};

export const isAny = (object: MessageProps): object is MessageCoreProps => {
  return object.type === "any";
};
