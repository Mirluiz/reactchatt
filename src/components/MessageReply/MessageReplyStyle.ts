export const style = `
 .rc-message-reply_overflow {
  overflow: hidden;
}

.rc-message-reply_container {
  border-left: 3px solid var(--rc-palette-accent);
  padding-left: var(--rc-sx-1);
}


.rc-message-reply_info {
  display: flex;
  flex-direction: column;
}

.rc-message-reply_title {
  color: var(--rc-palette-accent);
}

.rc-message-reply_text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow: hidden;
  color: var(--rc-palette-on-paper);
}


.rc-message-reply-image_info {
  display: flex;
  gap: var(--rc-sx-1);
  align-items: center;
}
`;
