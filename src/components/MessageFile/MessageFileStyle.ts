export const style = `
.reactchat .rc-message-file {
	display: flex;
	position: relative;
	margin-left: var(--rc-sx-1);
	margin-right: var(--rc-sx-1);
}

.reactchat .rc-message-file_body {
	padding: var(--rc-sx-1);
	background-color: var(--rc-palette-right-message);
	min-width: 140px;
	overflow: hidden;
}

.reactchat .rc-message-file-tail {
	display: flex;
	position: absolute;
	bottom: 0;
}


.reactchat .rc-message-file-tail.right {
	right: -8px;
}
.reactchat .rc-message-file-tail.left {
	left: -8px;
}

.reactchat .rc-message-files {
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-bottom: var(--rc-sx-05);
}

.reactchat .rc-message-file_container {
	display: flex;
  align-items: flex-end;
}



.reactchat .rc-message-file-doc {
  display: flex;
  margin-right: var(--rc-sx-05);
}

.reactchat .rc-message-file-text {
  max-width: 150px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-right: 2;
}

.reactchat .rc-message-file-text > div:first-of-type {
  margin-bottom: var(--rc-sx-05);
}

.reactchat .rc-message-file_element {
  display: flex;
  align-items: center;
}

.reactchat .rc-message-file_element:not(:first-child) {
  margin-top: var(--rc-sx-05);
}

`;
