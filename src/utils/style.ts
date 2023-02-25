import {
  MessageStyle,
  MessageFileStyle,
  MessageMetaStyle,
  MessageReplyStyle,
  MessageSystemStyle,
  MessageImageStyle,
} from "../components";
import {
  MessengerComposerStyle,
  MessengerBodyStyle,
  MessengerStyle,
} from "../index";
import {
  AvatarStyle,
  LoaderStyle,
  IconButtonStyle,
  TypographyStyle,
} from "../elements";

export const ejectStyles = (document: Document) => {
  const style = document.createElement("style");
  style.innerText = [
    MessageStyle,
    MessageFileStyle,
    MessageImageStyle,
    MessageMetaStyle,
    MessageReplyStyle,
    MessageSystemStyle,
    MessengerComposerStyle,
    MessengerBodyStyle,
    MessengerStyle,
    AvatarStyle,
    LoaderStyle,
    IconButtonStyle,
    TypographyStyle,
  ]
    .join("")
    .replace(/\n|\r/g, " ");

  document.head.appendChild(style);
};
