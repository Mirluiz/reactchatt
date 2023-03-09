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
  TypingStyle,
} from "../elements";

export const ejectStyles = (document: Document) => {
  if (document.querySelector("#rc-style")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "rc-style";

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
    TypingStyle,
  ]
    .join("")
    .replace(/\n|\r/g, " ");

  document.head.appendChild(style);
};
