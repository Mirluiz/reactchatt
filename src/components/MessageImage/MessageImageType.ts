import { MessageCoreProps } from "../../@types/message";

export interface Image {
	id: string;
	title: string;
	url: string;
	width: number;
	height: number;
}

export interface MessageImageProps extends MessageCoreProps {
	caption?: string;
	images: Array<Image>;
}
