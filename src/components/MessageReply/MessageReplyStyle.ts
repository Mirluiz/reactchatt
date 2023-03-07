export const style = `
.reactchat .rc-message-reply_overflow {
  overflow: hidden;
  margin-bottom: var(--rc-sx-05);
  cursor: pointer;
}

.reactchat .rc-message-reply_container {
  border-left: 2px solid var(--rc-palette-reply);
  padding-left: var(--rc-sx-05);
}


.reactchat .rc-message-reply_info {
  display: flex;
  flex-direction: column;
}

.reactchat .rc-message-reply_title {
  color: var(--rc-palette-reply);
  overflow: hidden;
}

.reactchat .rc-message-reply_text {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow: hidden;
  color: var(--rc-palette-text);
}


.reactchat .rc-message-reply-image_info {
  display: flex;
  overflow: hidden;
}
`;
