export const style = `
.reactchat .rc-composer {
	padding-top: var(--rc-sx-1);
	margin-top: var(--rc-sx-05);
	margin-bottom: var(--rc-sx-05);
	display: flex;
	width: 100%;
	justify-content: center;
}

.reactchat .rc-composer__left {
	width: 100%;
	background-color: var(--rc-palette-composer);
	border-radius: var(--rc-shape-border-radius);
	border-bottom-right-radius: 0;
	display: flex;
	flex-direction: column;
	margin-right: var(--rc-sx-1);
}

.reactchat .rc-composer__main {
	position: relative;
	flex-grow: 1;
	border-bottom-right-radius: 0;
	display: flex;
	justify-content: center;
	align-items: flex-end;
}

.reactchat .rc-left__icon {
	flex-grow: 0.1;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: flex-end;
}

.reactchat .rc-composer_textarea {
	flex-grow: 10;
	height: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	position: relative;
	background-color: var(--rc-palette-composer);
}

.reactchat .rc-textarea {
	border: none;
	outline: none;
	resize: none;
	width: 100%;
	transition: all 0.15s ease-in;
	line-height: 25px;
	height: 25px;
	padding: 0;
	padding-top: var(--rc-sx-1);
	padding-bottom: var(--rc-sx-1);
	max-height: 200px;
  background-color: var(--rc-palette-composer);
  color: var(--rc-palette-text);
}
.reactchat .rc-textarea_hidden {
	visibility: hidden;
	position: absolute;
	border: none;
	outline: none;
	resize: none;
	width: 100%;
	transition: all 0.15s ease-in;
	line-height: 25px;
	height: 25px;
	padding: 0;
}

.reactchat .rc-send__icon {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  fill: var(--rc-palette-accent) !important;
}

.reactchat .rc-send__icon .rc-icon_div {
  position: relative;
  right: -2px;
}

.reactchat .rc-composer-replyMessage {
	max-height: 70px;
	padding-left: var(--rc-sx-2);
	padding-top: var(--rc-sx-1);
	padding-bottom: var(--rc-sx-1);
	display: flex;
	justify-content: space-between;
	align-items: center;
	overflow: hidden;
	position: relative;
}


`;
