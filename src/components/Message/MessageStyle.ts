export const style = `
.reactchat .rc-message-text_container {
	display: flex;
	align-items: flex-end;
	max-width: 80%;
}

.reactchat .rc-message-text {
	display: flex;
	position: relative;
	margin-left: 5px;
	margin-right: 5px;
}

.reactchat .rc-message-text_body {
	padding: 0.4rem;
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
  right: -4px;
}
.rc-message-text-tail.left {
  left: -4px;
}
`;
