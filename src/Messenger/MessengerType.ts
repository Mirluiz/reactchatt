import { MessageProps } from "../@types/message";
import { MessengerBodyProps } from "../MessengerBody";
import { MessengerComposerProps } from "../MessengerComposer";

export interface PartialMessengerProps
  extends Partial<MessengerBodyProps>,
    Partial<MessengerComposerProps>,
    Partial<MessengerProps> {}

export interface MessengerProps
  extends MessengerBodyProps,
    MessengerComposerProps {
  me: string;
  messages: Array<MessageProps>;
}
