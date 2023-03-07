export const style = `
.reactchat .rc-message-text_container {
	display: flex;
	align-items: flex-end;
}

.reactchat .rc-message-text {
	display: flex;
	position: relative;
	margin-left: var(--rc-sx-1);
	margin-right: var(--rc-sx-1);
}

.reactchat .rc-message-text_body {
	padding: 7px;
	display: flex;
	background-color: var(--rc-palette-right-message);
}

.reactchat .rc-message-text-tail {
	display: flex;
	align-items: flex-end;
	position: absolute;
	bottom: 0;
}

.rc-message-text-tail.right {
  right: -7.4px;
}
.rc-message-text-tail.left {
  left: -7.4px;
}
`;
