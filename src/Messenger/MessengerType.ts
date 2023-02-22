import { MessageProps } from "../@types/message";
import { MessengerBodyProps } from "../MessengerBody/MessengerBodyType";
import { MessengerComposerProps } from "../MessengerComposer/MessengerComposerType";

export interface PartialMessengerProps
  extends Partial<MessengerBodyProps>,
    Partial<MessengerComposerProps>,
    Partial<MessengerProps> {}

export interface MessengerProps
  extends MessengerBodyProps,
    MessengerComposerProps {
  messages: Array<MessageProps>;
}
