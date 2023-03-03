export const style = `
.reactchat .rc-message-file_container {
	display: flex;
	align-items: flex-end;
	
}

.reactchat .rc-message-file {
	display: flex;
	position: relative;
	margin-left: 8px;
	margin-right: 9px;
}

.reactchat .rc-message-file_body {
	padding: 0.4rem;
	display: flex;
	background-color: var(--rc-palette-right-message);
	min-width: 140px;
}

.reactchat .rc-message-file-tail {
	display: flex;
	position: absolute;
	bottom: 0;
}


.rc-message-file-tail.right {
	right: -8px;
}
.rc-message-file-tail.left {
	left: -8px;
}
`;
