import { MessageProps } from "../@types/message";
import { MessengerBodyProps } from "../MessengerBody";
import { MessengerComposerProps } from "../MessengerComposer";
import { MessengerEvents } from "../@types/events";

export interface PartialMessengerProps
  extends Partial<MessengerBodyProps>,
    Partial<MessengerEvents>,
    Partial<MessengerComposerProps>,
    Partial<MessengerProps> {}

export interface MessengerProps
  extends MessengerBodyProps,
    MessengerEvents,
    MessengerComposerProps {
  days?: boolean;
  me: string;
  messages: Array<MessageProps>;
}
