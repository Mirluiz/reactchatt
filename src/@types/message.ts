import { MessageTextProps } from "../components/Message/MessageType";
import { MessageFileProps } from "../components/MessageFile/MessageFileType";
import { MessageImageProps } from "../components/MessageImage/MessageImageType";

export type MessageCoreProps = {
	id: string;
	title: string;
	position: "left" | "right";
	status: MessageStatus;
	pending?: boolean;
	edited?: boolean;
	date: string;
	type: "text" | "file" | "img";
	repliedMessage?: MessageProps;
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
