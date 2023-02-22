export const style = `
.reactchat .rc-message-file_container {
	display: flex;
	align-items: flex-end;
}

.reactchat .rc-message-file {
	display: flex;
	position: relative;
	margin-left: 5px;
	margin-right: 5px;
}

.reactchat .rc-message-file_body {
	padding: 0.4rem;
	display: flex;
	background-color: var(--rc-palette-right-message);
}

.reactchat .rc-message-file-tail {
	display: flex;
	position: absolute;
	bottom: 0;
}


.rc-message-file-tail.right {
	right: -4px;
}
.rc-message-file-tail.left {
	left: -4px;
}
`;
